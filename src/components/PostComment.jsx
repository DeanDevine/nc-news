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
        setApiError(null);
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
        <label htmlFor="comment-author">Username: </label>
        <p></p>
        <select
          id="comment-author"
          value={commentAuthor}
          onChange={(event) => {
            setCommentAuthor(event.target.value);
          }}
        >
          <option></option>
          <option value={"tickle122"}>tickle122</option>
          <option value={"grumpy19"}>grumpy19</option>
          <option value={"happyamy2016"}>happyamy2016</option>
          <option value={"cooljmessy"}>cooljmessy</option>
          <option value={"weegembump"}>weegembump</option>
          <option value={"jessjelly"}>jessjelly</option>
        </select>
        <p></p>
        <button>Post Comment</button>
      </form>
      {isPostingComment ? <p>Posting comment...</p> : null}
      {apiError && apiError.message === "Network Error" ? (
        <p>{apiError.message}</p>
      ) : apiError ? (
        <p>
          {apiError.response.status}: {apiError.response.data.msg}
        </p>
      ) : null}
    </div>
  );
}

export default PostComment;
