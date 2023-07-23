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
import UserProfile from "./components/UserProfile";
import UserPage from "./components/UserPage";

function App() {
  const [header, setHeader] = useState("all");
  const [active, setActive] = useState(["all", "date", "descending"]);
  return (
    <>
      <Header header={header} />
      <Nav active={active} setActive={setActive} setHeader={setHeader} />
      <Routes>
        <Route
          path="/"
          element={<Articles active={active} setActive={setActive} />}
        />
        <Route
          path="/topics/:topic"
          element={<Articles active={active} setActive={setActive} />}
        />
        <Route
          path="/articles/:article_id"
          element={<Article setHeader={setHeader} setActive={setActive} />}
        />
        <Route path="/articles/post-article" element={<PostArticle />} />
        <Route path="/users/create-user" element={<CreateUser />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/users/user/profile" element={<UserProfile />} />
        <Route path="/users/user/comments" element={<UserComments />} />
        <Route
          path="/users/user/:username"
          element={<UserPage setActive={setActive} />}
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
