import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import { useState } from "react";

function App() {
  const [header, setHeader] = useState("all");
  return (
    <>
      <Header header={header} />
      <Nav />
      <Routes>
        <Route path="/" element={<Articles setHeader={setHeader} />} />
        <Route path="/:topic" element={<Articles setHeader={setHeader} />} />
        <Route
          path="/articles/:article_id"
          element={<Article setHeader={setHeader} />}
        />
      </Routes>
    </>
  );
}

export default App;
