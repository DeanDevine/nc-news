import { useContext, useState } from "react";
import { postComment } from "./api";
import { UserContext } from "../contexts/User";

function PostComment({ article_id, setComments, setCommentsCount }) {
  const { user } = useContext(UserContext);
  const [commentBody, setCommentBody] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      body: commentBody,
      username: user,
    };

    setIsPostingComment(true);

    postComment(article_id, newComment)
      .then((commentData) => {
        setComments((current) => {
          return [commentData, ...current];
        });
        setCommentsCount((current) => {
          return current + 1;
        });
        setIsPostingComment(false);
        setCommentBody("");
        setApiError(null);
      })
      .catch((err) => {
        setApiError(err);
        setIsPostingComment(false);
      });
  };

  return (
    <div className="post-comment">
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment-body">Comment: </label>
        <p></p>
        <textarea
          id="comment-body"
          value={commentBody}
          rows="8"
          cols="110"
          onChange={(event) => {
            setCommentBody(event.target.value);
          }}
        />
        <p></p>
        <button>Post Comment</button>
      </form>
      {isPostingComment ? <p>Posting comment...</p> : null}
      {apiError && apiError.message === "Network Error" ? (
        <p style={{ color: "#f25b6f" }}>{apiError.message}</p>
      ) : apiError ? (
        <p style={{ color: "#f25b6f" }}>
          {apiError.response.status}: {apiError.response.data.msg}
        </p>
      ) : null}
    </div>
  );
}

export default PostComment;
