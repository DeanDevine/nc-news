import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Articles({ articles, setArticles }) {
  useEffect(() => {
    axios
      .get("https://be-nc-news-whiy.onrender.com/api/articles")
      .then(({ data }) => {
        setArticles(data.articles);
      });
  }, []);

  return (
    <section>
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
                <p>Created at: {created_at.slice(0, 10)}</p>
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
