import { useContext, useEffect, useState } from "react";
import { deleteComment, getCommentsByUsername } from "./api";
import { UserContext } from "../contexts/User";

function UserComments({ setHeader }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [isRemovingComment, setIsRemovingComment] = useState(false);
  const [commentRemoved, setCommentRemoved] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    setHeader(`${user} comments`);
    getCommentsByUsername(user)
      .then((commentsData) => {
        setComments(commentsData);
        setApiError(null);
      })
      .catch(() => {
        setIsSignedIn(false);
      });
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
      {!isSignedIn ? (
        <p>Please sign in to view comments</p>
      ) : isSignedIn && !comments.length ? (
        <p>You have not posted any comments</p>
      ) : null}
      {isRemovingComment ? (
        <p>Removing comment...</p>
      ) : commentRemoved ? (
        <p>Comment removed</p>
      ) : null}
      {apiError ? <p>Something has gone wrong</p> : null}
      {comments.map(({ comment_id, body, created_at }) => {
        return (
          <div className="comment" key={comment_id}>
            <div className="comment-body">{body}</div>
            <p>Created at: {new Date(created_at).toDateString()} </p>
            <button onClick={() => handleClick(comment_id)}>
              Delete Comment
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default UserComments;
