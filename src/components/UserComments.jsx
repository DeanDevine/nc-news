import { useEffect, useState } from "react";
import { deleteComment } from "./api";

function UserComments({ setHeader, userComments, setUserComments }) {
  const [commentRemoved, setCommentRemoved] = useState(false);

  useEffect(() => {
    setHeader("user");
  });

  const handleClick = (comment_id) => {
    deleteComment(comment_id).then(() => {
      setCommentRemoved(true);
      setUserComments((current) => {
        return current.filter((comment) => {
          return comment.comment_id !== comment_id;
        });
      });
    });
  };

  return (
    <div className="user-comments">
      {!userComments.length ? <p>You have not posted any comments</p> : null}
      {commentRemoved ? <p>Comment removed</p> : null}
      {userComments.map(({ comment_id, body, created_at }) => {
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
