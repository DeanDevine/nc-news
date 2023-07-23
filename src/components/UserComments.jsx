import { useContext, useEffect, useState } from "react";
import { deleteComment, getCommentsByUsername } from "./api";
import { UserContext } from "../contexts/User";

function UserComments() {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [isRemovingComment, setIsRemovingComment] = useState(false);
  const [commentRemoved, setCommentRemoved] = useState(false);
  const [apiError, setApiError] = useState(null);

  if (!user) {
    return (
      <div className="">
        <p className="">You are not signed in</p>
      </div>
    );
  }

  useEffect(() => {
    getCommentsByUsername(user)
      .then((commentsData) => {
        setComments(commentsData);
        setApiError(null);
      })
      .catch(() => {});
  }, []);

  const handleClick = (comment_id) => {
    setIsRemovingComment(true);
    deleteComment(comment_id)
      .then(() => {
        setIsRemovingComment(false);
        setCommentRemoved(true);
        setComments((current) => {
          return current.filter((comment) => {
            return comment.comment_id !== comment_id;
          });
        });
      })
      .catch((err) => {
        setApiError(err);
      });
  };

  return (
    <div className="user-comments">
      {isRemovingComment ? (
        <p>Removing comment...</p>
      ) : commentRemoved ? (
        <p>Comment removed</p>
      ) : null}
      {user && !comments.length && <p>You have not posted any comments</p>}
      {apiError && <p>Something has gone wrong</p>}
      {comments.map(({ comment_id, body, created_at }) => {
        return (
          <div className="comment" key={comment_id}>
            <div className="comment-body">{body}</div>
            <p>Created at: {new Date(created_at).toDateString()} </p>
            <button onClick={() => handleClick(comment_id)}>
              Remove Comment
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default UserComments;
