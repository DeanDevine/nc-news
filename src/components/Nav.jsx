import { Link } from "react-router-dom";

function Nav({ active, setActive }) {
  return (
    <nav>
      <Link
        to="/"
        onClick={() => {
          setActive(["all", "date", "descending"]);
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
        }}
      >
        <button id={active.includes("coding") ? "active" : ""}>Coding</button>
      </Link>
      <Link
        to="/topics/cooking"
        onClick={() => {
          setActive(["cooking", "date", "descending"]);
        }}
      >
        <button id={active.includes("cooking") ? "active" : ""}>Cooking</button>
      </Link>
      <Link
        to="/topics/football"
        onClick={() => {
          setActive(["football", "date", "descending"]);
        }}
      >
        <button id={active.includes("football") ? "active" : ""}>
          Football
        </button>
      </Link>
      <Link
        to="/users/user/comments"
        onClick={() => {
          setActive(["user", "date", "descending"]);
        }}
      >
        <button id={active.includes("user") ? "active" : ""}>
          User Comments
        </button>
      </Link>
      <Link
        to="/sign-in"
        onClick={() => {
          setActive(["sign-in", "date", "descending"]);
        }}
      >
        <button id={active.includes("sign-in") ? "active" : ""}>Sign In</button>
      </Link>
    </nav>
  );
}

export default Nav;
