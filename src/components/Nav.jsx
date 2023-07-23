import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";

function Nav({ active, setActive, setHeader }) {
  const { user, setUser } = useContext(UserContext);
  return (
    <nav>
      <Link
        to="/"
        onClick={() => {
          setActive(["all", "date", "descending"]);
          setHeader("all");
        }}
      >
        <button id={active.includes("all") ? "active" : ""}>
          All Articles
        </button>
      </Link>
      <Link
        to="/topics/coding"
        onClick={() => {
          setActive(["coding", "date", "descending"]);
          setHeader("coding");
        }}
      >
        <button id={active.includes("coding") ? "active" : ""}>Coding</button>
      </Link>
      <Link
        to="/topics/cooking"
        onClick={() => {
          setActive(["cooking", "date", "descending"]);
          setHeader("cooking");
        }}
      >
        <button id={active.includes("cooking") ? "active" : ""}>Cooking</button>
      </Link>
      <Link
        to="/topics/football"
        onClick={() => {
          setActive(["football", "date", "descending"]);
          setHeader("football");
        }}
      >
        <button id={active.includes("football") ? "active" : ""}>
          Football
        </button>
      </Link>
      <Link
        to="/articles/post-article"
        onClick={() => {
          setActive(["post-article", "date", "descending"]);
          setHeader("post article");
        }}
      >
        <button id={active.includes("post-article") ? "active" : ""}>
          Post Article
        </button>
      </Link>
      <p></p>
      <Link
        to="/users/user/profile"
        onClick={() => {
          setActive(["user-profile", "date", "descending"]);
          setHeader(user ? `${user} profile` : "profile");
        }}
      >
        <button id={active.includes("user-profile") ? "active" : ""}>
          User Profile
        </button>
      </Link>
      <Link
        to="/users/user/comments"
        onClick={() => {
          setActive(["user", "date", "descending"]);
          setHeader(user ? `${user} comments` : "comments");
        }}
      >
        <button id={active.includes("user") ? "active" : ""}>
          User Comments
        </button>
      </Link>
      <Link
        to="/users/create-user"
        onClick={() => {
          setActive(["create-user", "date", "descending"]);
          setHeader("create user");
        }}
      >
        <button id={active.includes("create-user") ? "active" : ""}>
          Create User
        </button>
      </Link>
      <Link
        to="/sign-in"
        onClick={() => {
          setActive(["sign-in", "date", "descending"]);
          setHeader("sign in");
        }}
      >
        {!user ? (
          <button id={active.includes("sign-in") ? "active" : ""}>
            Sign In
          </button>
        ) : null}
      </Link>
      <Link to="/">
        {user ? <button onClick={() => setUser(null)}>Sign Out</button> : null}
      </Link>
    </nav>
  );
}

export default Nav;
