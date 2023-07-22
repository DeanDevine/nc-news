import { useContext, useEffect, useState } from "react";
import { deleteComment, getComments, patchComment } from "./api";
import PostComment from "./PostComment";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";

function Comments({ article_id, setCommentsCount }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [commentVotes, setCommentVotes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRemovingComment, setIsRemovingComment] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    getComments(article_id).then((commentsData) => {
      setIsLoading(false);
      setComments(commentsData);

      setCommentVotes(() => {
        let obj = {};
        commentsData.forEach((comment) => {
          obj[comment.comment_id] = 0;
        });
        return obj;
      });
    });
  }, []);

  const handleClickRemoveComment = (comment_id) => {
    setIsRemovingComment(true);
    deleteComment(comment_id)
      .then(() => {
        setComments((current) => {
          return current.filter((comment) => {
            return comment.comment_id !== comment_id;
          });
        });
        setIsRemovingComment(false);
      })
      .catch((err) => {
        setApiError(err);
      });
  };

  const handleClickVote = (comment_id, voteCount) => {
    setCommentVotes((currentCommentVotes) => {
      return {
        ...currentCommentVotes,
        [comment_id]: currentCommentVotes[comment_id] + voteCount,
      };
    });

    patchComment(comment_id, voteCount)
      .then(() => {
        setApiError(null);
      })
      .catch((err) => {
        setCommentVotes((currentCommentVotes) => {
          return {
            ...currentCommentVotes,
            [comment_id]: currentCommentVotes[comment_id] + 0,
          };
        });
        setApiError(err);
      });
  };

  return (
    <>
      <PostComment
        article_id={article_id}
        setComments={setComments}
        setCommentsCount={setCommentsCount}
      />
      <div className="comments-section">
        {isLoading ? <p>Loading comments...</p> : null}
        {isRemovingComment ? <p>Removing comment...</p> : null}
        {apiError ? <p>Something has gone wrong</p> : null}
        {comments.length === 0 ? <p>No comments</p> : null}
        {comments.map(({ comment_id, votes, created_at, author, body }) => {
          return (
            <div className="comment" key={comment_id}>
              <div className="comment-body">{body}</div>
              <p>
                Posted by: <Link to={`/users/user/${author}`}>{author}</Link>
              </p>
              <p>Created at: {new Date(created_at).toDateString()}</p>
              <p>
                Votes: {""}
                {!commentVotes[comment_id]
                  ? votes
                  : votes + commentVotes[comment_id]}
              </p>
              {user !== author ? (
                <button onClick={() => handleClickVote(comment_id, 1)}>
                  Vote up
                </button>
              ) : null}

              {user !== author ? (
                <button onClick={() => handleClickVote(comment_id, -1)}>
                  Vote down
                </button>
              ) : null}
              {user === author ? (
                <button onClick={() => handleClickRemoveComment(comment_id)}>
                  Remove Comment
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Comments;
