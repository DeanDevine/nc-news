import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import { useState } from "react";
import UserComments from "./components/UserComments";
import SignInPage from "./components/SignInPage";
import Error from "./components/Error";
import CreateUser from "./components/CreateUser";
import PostArticle from "./components/PostArticle";

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
          path="/topics/:topic"
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
        <Route
          path="/articles/post-article"
          element={<PostArticle setHeader={setHeader} />}
        />
        <Route
          path="/users/create-user"
          element={<CreateUser setHeader={setHeader} />}
        />
        <Route path="/sign-in" element={<SignInPage setHeader={setHeader} />} />
        <Route
          path="/users/user/comments"
          element={<UserComments setHeader={setHeader} />}
        />
        <Route
          path="*"
          element={<Error errorStatus={404} errorMessage={"Not Found"} />}
        />
      </Routes>
    </>
  );
}

export default App;
