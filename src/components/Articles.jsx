import axios from "axios";
import { useEffect } from "react";

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
            <div className="article" key={article_id}>
              <h2>{title}</h2>
              <h3>{topic}</h3>
              <img src={article_img_url} alt={`image for ${title}`} />
              <p>Posted by: {author}</p>
              <p>Created at: {created_at}</p>
              <p>Votes: {votes}</p>
              <p>Comments: {comment_count}</p>
            </div>
          );
        }
      )}
    </section>
  );
}

export default Articles;
