import { useContext, useEffect, useState } from "react";
import { deleteComment, getComments } from "./api";
import PostComment from "./PostComment";
import { UserContext } from "../contexts/User";

function Comments({ article_id }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemovingComment, setIsRemovingComment] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    getComments(article_id).then((commentsData) => {
      setIsLoading(false);
      setComments(commentsData);
    });
  }, []);

  const handleClick = (comment_id) => {
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

  return (
    <>
      <PostComment article_id={article_id} setComments={setComments} />
      <div className="comments-section">
        {isLoading ? <p>Loading comments...</p> : null}
        {isRemovingComment ? <p>Removing comment...</p> : null}
        {apiError ? <p>Something has gone wrong</p> : null}
        {comments.length === 0 ? <p>No comments</p> : null}
        {comments.map(({ comment_id, votes, created_at, author, body }) => {
          return (
            <div className="comment" key={comment_id}>
              <div className="comment-body">{body}</div>
              <p>Posted by: {author}</p>
              <p>Created at: {new Date(created_at).toDateString()}</p>
              <p>Votes: {votes}</p>
              {user === author ? (
                <button onClick={() => handleClick(comment_id)}>
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
