import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { getArticle } from "./api";

function Article() {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    getArticle(article_id).then((articleData) => {
      setIsLoading(false);
      setArticle(articleData);
    });
  }, []);

  return (
    <section>
      {isLoading ? <p>Loading article...</p> : null}

      <div className="article" key={article_id}>
        <h2>{article.title}</h2>
        <h3>{article.topic}</h3>
        <img src={article.article_img_url} alt={article.title} />
        <div className="article-text">{article.body}</div>
        <p>Posted by: {article.author}</p>
        <p>Created at: {article.created_at}</p>
        <p>Votes: {article.votes}</p>
        <p>Comments: {article.comment_count}</p>
      </div>
      <Comments />
    </section>
  );
}

export default Article;
