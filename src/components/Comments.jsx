import { useEffect, useState } from "react";
import { getComments } from "./api";
import PostComment from "./PostComment";

function Comments({ article_id, setUserComments }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments(article_id).then((commentsData) => {
      setIsLoading(false);
      setComments(commentsData);
    });
  }, []);

  return (
    <>
      <PostComment
        article_id={article_id}
        setComments={setComments}
        setUserComments={setUserComments}
      />
      <div className="comments-section">
        {isLoading ? <p>Loading comments...</p> : null}
        {comments.length === 0 ? <p>No comments</p> : null}
        {comments.map(({ comment_id, votes, created_at, author, body }) => {
          return (
            <div className="comment" key={comment_id}>
              <div className="comment-body">{body}</div>
              <p>Posted by: {author}</p>
              <p>Created at: {new Date(created_at).toDateString()}</p>
              <p>Votes: {votes}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Comments;
