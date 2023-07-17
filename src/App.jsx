import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Articles from "./components/Articles";

function App() {
  const [articles, setArticles] = useState([]);

  return (
    <div>
      <Header />
      <Nav />
      <Routes>
        <Route
          path="/"
          element={<Articles articles={articles} setArticles={setArticles} />}
        />
      </Routes>
    </div>
  );
}

export default App;
