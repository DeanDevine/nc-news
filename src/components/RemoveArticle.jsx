import { useState } from "react";
import { deleteArticle } from "./api";

function RemoveArticle({ article_id, author, user, setIsRemoved }) {
  const [isRemovingArticle, setIsRemovingArticle] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleClick = (article_id) => {
    setIsRemovingArticle(true);
    deleteArticle(article_id)
      .then(() => {
        setIsRemoved(true)
        setIsRemovingArticle(false);
        setApiError(null);
      })
      .catch((err) => {
        setApiError(err);
      });
  };

  return (
    <div>
      {user === author ? (
        <button onClick={() => handleClick(article_id)}>Remove Article</button>
      ) : null}
      {isRemovingArticle ? <p>Removing article...</p> : null}
      {apiError ? <p>Something has gone wrong</p> : null}
    </div>
  );
}

export default RemoveArticle;
