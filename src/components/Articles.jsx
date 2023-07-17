import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "./api";

function Articles({ articles, setArticles }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles().then((articlesData) => {
      setIsLoading(false);
      setArticles(articlesData);
    });
  }, []);

  return (
    <section>
      {isLoading ? <p>Loading articles...</p> : null}
      {articles.map(
        ({
          author,
          title,
          article_id,
          topic,
          created_at,
          votes,
          article_img_url,
          comment_count,
        }) => {
          return (
            <Link to={`/articles/${article_id}`} key={article_id}>
              <div className="article">
                <h2>{title}</h2>
                <h3>{topic}</h3>
                <img src={article_img_url} alt={title} />
                <p>Posted by: {author}</p>
                <p>Created at: {new Date(created_at).toDateString()}</p>
                <p>Votes: {votes}</p>
                <p>Comments: {comment_count}</p>
              </div>
            </Link>
          );
        }
      )}
    </section>
  );
}

export default Articles;
