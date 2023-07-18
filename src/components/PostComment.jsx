import { useState } from "react";
import { postComment } from "./api";

function PostComment({ article_id, setComments }) {
  const [commentBody, setCommentBody] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      body: commentBody,
      author: commentAuthor,
    };

    setIsPostingComment(true);

    postComment(article_id, newComment)
      .then((commentData) => {
        setComments((current) => {
          return [commentData, ...current];
        });
        setIsPostingComment(false);
        setCommentBody("");
        setCommentAuthor("");
      })
      .catch((err) => {
        setIsPostingComment(false);
        setApiError(err);
      });
  };

  return (
    <div className="post-comment">
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment-body">Comment: </label>
        <textarea
          id="comment-body"
          value={commentBody}
          rows="4"
          cols="100"
          onChange={(event) => {
            setCommentBody(event.target.value);
          }}
        />
        <p></p>
        <label htmlFor="comment-author">Username: </label>
        <input
          id="comment-author"
          type="text"
          value={commentAuthor}
          onChange={(event) => {
            setCommentAuthor(event.target.value);
          }}
        />
        <p></p>
        <button>Post Comment</button>
      </form>
      {apiError ? (
        <p>
          {apiError.response.status}: {apiError.response.data.msg}
        </p>
      ) : null}
      {isPostingComment ? <p>Posting comment...</p> : null}
    </div>
  );
}

export default PostComment;
