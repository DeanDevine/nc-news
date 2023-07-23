import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { postArticle } from "./api";

function PostArticle() {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [articleImgUrl, setArticleImgUrl] = useState();
  const [isPostingArticle, setIsPostingArticle] = useState(false);
  const [isPosted, setIsPosted] = useState("");
  const [apiError, setApiError] = useState(null);

  if (!user) {
    return (
      <div className="">
        <p className="">Please sign in to post a new article</p>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newArticle = {
      author: user,
      title,
      body,
      topic,
      article_img_url: articleImgUrl,
    };

    setIsPostingArticle(true);

    postArticle(newArticle)
      .then(() => {
        setIsPostingArticle(false);
        setIsPosted("Article posted");
        setTitle("");
        setBody("");
        setArticleImgUrl();
        setApiError(null);
      })
      .catch((err) => {
        setApiError(err);
        setIsPostingArticle(false);
        setIsPosted("");
      });
  };

  return (
    <div className="post-article">
      <form className={!user ? "true" : ""} onSubmit={handleSubmit}>
        <label htmlFor="article-title">Title: </label>
        <input
          id="article-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <p></p>
        <label htmlFor="article-body">Body: </label>
        <p></p>
        <textarea
          id="article-body"
          value={body}
          rows="8"
          cols="110"
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
        <p></p>
        <label htmlFor="article-topic">Topic: </label>
        <select
          id="article-topic"
          value={topic}
          onChange={(event) => {
            setTopic(event.target.value);
          }}
        >
          <option></option>
          <option value={"coding"}>Coding</option>
          <option value={"cooking"}>Cooking</option>
          <option value={"football"}>Football</option>
        </select>
        <p></p>
        <label htmlFor="article-img-url">Article img url: </label>
        <input
          id="article-img-url"
          type="text"
          value={articleImgUrl}
          onChange={(e) => {
            setArticleImgUrl(e.target.value);
          }}
        ></input>
        <p></p>
        <button>Post Article</button>
      </form>
      {isPostingArticle ? <p>Posting article...</p> : <p>{isPosted}</p>}
      {apiError && apiError.message === "Network Error" ? (
        <p style={{ color: "#f25b6f" }}>{apiError.message}</p>
      ) : apiError ? (
        <p style={{ color: "#f25b6f" }}>
          {apiError.response.status}: {apiError.response.data.msg}
        </p>
      ) : null}
    </div>
  );
}

export default PostArticle;
