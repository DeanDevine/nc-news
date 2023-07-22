import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getArticles } from "./api";
import Error from "./Error";

function Articles({ setHeader, active, setActive }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const location = useLocation();

  const { topic } = useParams();

  const [searchParams] = useSearchParams();

  const params = Object.fromEntries([...searchParams]);

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, params)
      .then((articlesData) => {
        {
          topic ? setHeader(topic) : setHeader("all");
        }
        setIsLoading(false);
        setArticles(articlesData);
        setApiError(null);
      })
      .catch((err) => {
        setApiError(err);
      });
  }, [topic, searchParams]);

  if (apiError) {
    return (
      <Error
        errorStatus={apiError.response.status}
        errorMessage={apiError.response.data.msg}
      />
    );
  }

  return (
    <>
      <div className="query-search-container">
        <h3>Sort by:</h3>
        <Link
          to={`${window.location.pathname}?sort_by=articles.created_at`}
          onClick={() =>
            setActive((curr) => {
              curr.splice(1, 2);
              return [...curr, "date", "descending"];
            })
          }
        >
          <button id={active.includes("date") ? "active" : ""}>Date</button>
        </Link>
        <Link
          to={`${window.location.pathname}?sort_by=comment_count`}
          onClick={() =>
            setActive((curr) => {
              curr.splice(1, 2);
              return [...curr, "comment_count", "descending"];
            })
          }
        >
          <button id={active.includes("comment_count") ? "active" : ""}>
            Comment Count
          </button>
        </Link>
        <Link
          to={`${window.location.pathname}?sort_by=articles.votes`}
          onClick={() =>
            setActive((curr) => {
              curr.splice(1, 2);
              return [...curr, "votes", "descending"];
            })
          }
        >
          <button id={active.includes("votes") ? "active" : ""}>Votes</button>
        </Link>
        <h3>Order:</h3>
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
          onClick={() =>
            setActive((curr) => {
              curr.splice(2, 1);
              return [...curr, "ascending"];
            })
          }
        >
          <button id={active.includes("ascending") ? "active" : ""}>
            Ascending
          </button>
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
          onClick={() =>
            setActive((curr) => {
              curr.splice(2, 1);
              return [...curr, "descending"];
            })
          }
        >
          <button id={active.includes("descending") ? "active" : ""}>
            Descending
          </button>
        </Link>
      </div>
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
    </>
  );
}

export default Articles;
