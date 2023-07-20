import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { getArticle, patchArticle } from "./api";
import { HeaderContext } from "../contexts/Header";

function Article() {
  const {header, setHeader} = useContext(HeaderContext)
  const [article, setArticle] = useState({});
  const [articleVotes, setArticleVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    getArticle(article_id).then((articleData) => {
      setHeader(articleData.topic);
      setIsLoading(false);
      setArticle(articleData);
    });
  }, []);

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
        <p>Comments: {article.comment_count}</p>
        <button onClick={() => handleClick(1)}>Vote up</button>
        <button onClick={() => handleClick(-1)}>Vote down</button>
        {apiError && apiError.message === "Network Error" ? (
          <p>{apiError.message}</p>
        ) : apiError ? (
          <p>
            {apiError.response.status}: {apiError.response.data.msg}
          </p>
        ) : null}
      </div>
      <Comments article_id={article_id} />
    </section>
  );
}

export default Article;
