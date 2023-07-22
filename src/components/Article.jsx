import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { getArticle, patchArticle } from "./api";
import Error from "./Error";
import { UserContext } from "../contexts/User";
import RemoveArticle from "./RemoveArticle";

function Article({ setHeader, setActive }) {
  const { user } = useContext(UserContext);
  const [article, setArticle] = useState({});
  const [articleVotes, setArticleVotes] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoved, setIsRemoved] = useState(false);
  const [apiError, setApiError] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    getArticle(article_id)
      .then((articleData) => {
        setHeader(articleData.topic);
        setActive((curr) => {
          return curr.splice(0, 1, articleData.topic);
        });
        setIsLoading(false);
        setArticle(articleData);
      })
      .catch((err) => {
        setApiError(err);
      });
  }, [isRemoved]);

  if (apiError) {
    return (
      <Error
        errorStatus={apiError.response.status}
        errorMessage={apiError.response.data.msg}
      />
    );
  }

  const handleClick = (voteCount) => {
    setArticleVotes((currentArticleVotes) => {
      return currentArticleVotes + voteCount;
    });

    patchArticle(article_id, voteCount)
      .then(() => {
        setApiError(null);
      })
      .catch((err) => {
        setArticleVotes(0);
        setApiError(err);
      });
  };

  return (
    <section>
      <div className="article" key={article_id}>
        {isLoading ? <p>Loading article...</p> : null}
        <h2>{article.title}</h2>
        <img src={article.article_img_url} alt={article.title} />
        <div className="article-body">{article.body}</div>
        <p>Posted by: {article.author}</p>
        <p>Created at: {new Date(article.created_at).toDateString()}</p>
        <p>Votes: {article.votes + articleVotes}</p>
        <p>Comments: {Number(article.comment_count) + commentsCount}</p>
        {user !== article.author ? (
          <button onClick={() => handleClick(1)}>Vote up</button>
        ) : null}
        {user !== article.author ? (
          <button onClick={() => handleClick(-1)}>Vote down</button>
        ) : null}
        <RemoveArticle
          article_id={article_id}
          author={article.author}
          user={user}
          setIsRemoved={setIsRemoved}
        />
        {apiError && apiError.message === "Network Error" ? (
          <p>{apiError.message}</p>
        ) : apiError ? (
          <p>
            {apiError.response.status}: {apiError.response.data.msg}
          </p>
        ) : null}
      </div>
      <Comments article_id={article_id} setCommentsCount={setCommentsCount} />
    </section>
  );
}

export default Article;
