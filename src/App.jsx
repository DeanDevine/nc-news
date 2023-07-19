import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import ArticlesByTopic from "./components/ArticlesByTopic";

function App() {
  const [articles, setArticles] = useState([]);

  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route
          path="/"
          element={<Articles articles={articles} setArticles={setArticles} />}
        />
        <Route
          path="/:topic"
          element={
            <ArticlesByTopic articles={articles} setArticles={setArticles} />
          }
        />
        <Route path="/articles/:article_id" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
