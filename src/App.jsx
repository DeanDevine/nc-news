import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import { useState } from "react";

function App() {
  const [header, setHeader] = useState("all");
  const [active, setActive] = useState(["all", "date", "descending"]);
  return (
    <>
      <Header header={header} />
      <Nav active={active} setActive={setActive} />
      <Routes>
        <Route
          path="/"
          element={
            <Articles
              setHeader={setHeader}
              active={active}
              setActive={setActive}
            />
          }
        />
        <Route
          path="/:topic"
          element={
            <Articles
              setHeader={setHeader}
              active={active}
              setActive={setActive}
            />
          }
        />
        <Route
          path="/articles/:article_id"
          element={<Article setHeader={setHeader} setActive={setActive} />}
        />
      </Routes>
    </>
  );
}

export default App;
