import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getArticles } from "./api";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const { topic } = useParams();

  const [searchParams] = useSearchParams();

  const params = Object.fromEntries([...searchParams]);

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, params).then((articlesData) => {
      setIsLoading(false);
      setArticles(articlesData);
    });
  }, [topic, searchParams]);

  return (
    <section>
      <div className="query-search-container">
        <h2>Sort by:</h2>
        <Link to={`${window.location.pathname}?sort_by=articles.created_at`}>
          <button>Date</button>
        </Link>
        <Link to={`${window.location.pathname}?sort_by=comment_count`}>
          <button>Comment Count</button>
        </Link>
        <Link to={`${window.location.pathname}?sort_by=articles.votes`}>
          <button>Votes</button>
        </Link>
        <h2>Order:</h2>
        <Link
          to={
            /order/.test(location.search)
              ? location.pathname +
                location.search.replace(/&order(.*)/, "") +
                "&order=ASC"
              : location.search
              ? location.pathname + location.search + "&order=ASC"
              : "?order=ASC"
          }
        >
          <button>Ascending</button>
        </Link>
        <Link
          to={
            /order/.test(location.search)
              ? location.pathname +
                location.search.replace(/&order(.*)/, "") +
                "&order=DESC"
              : location.search
              ? location.pathname + location.search + "&order=DESC"
              : "?order=DESC"
          }
        >
          <button>Descending</button>
        </Link>
      </div>
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
