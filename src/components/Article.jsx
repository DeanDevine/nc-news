import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

function Article() {
  const [article, setArticle] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    axios
      .get(`https://be-nc-news-whiy.onrender.com/api/articles/${article_id}`)
      .then(({ data }) => {
        setArticle([data.article]);
      });
  }, []);

  return (
    <section>
      {article.map(
        ({
          author,
          title,
          body,
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
              <img src={article_img_url} alt={title} />
              <div className="article-text">{body}</div>
              <p>Posted by: {author}</p>
              <p>Created at: {created_at.slice(0, 10)}</p>
              <p>Votes: {votes}</p>
              <p>Comments: {comment_count}</p>
            </div>
          );
        }
      )}
      <Comments />
    </section>
  );
}

export default Article;
