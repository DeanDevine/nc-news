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
        <textarea
          id="comment-body"
          value={commentBody}
          rows="4"
          cols="100"
          onChange={(event) => {
            setCommentBody(event.target.value);
          }}
        />
        <br />
        <label htmlFor="comment-author">Username: </label>
        <select
          id="comment-author"
          value={commentAuthor}
          onChange={(event) => {
            setCommentAuthor(event.target.value);
          }}
        >
          <option value={"tickle122"}>tickle122</option>
          <option value={"grumpy19"}>grumpy19</option>
          <option value={"happyamy2016"}>happyamy2016</option>
          <option value={"cooljmessy"}>cooljmessy</option>
          <option value={"weegembump"}>weegembump</option>
          <option value={"jessjelly"}>jessjelly</option>
        </select>
        <br />
        <button>Post Comment</button>
      </form>
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
