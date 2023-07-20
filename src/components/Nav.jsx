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
        <button id={active.includes('all') ? "active" : ""}>All Articles</button>
      </Link>
      <Link
        to="/coding"
        onClick={() => {
          setActive(["coding", "date", "descending"]);
        }}
      >
        <button id={active.includes('coding') ? "active" : ""}>Coding</button>
      </Link>
      <Link
        to="/cooking"
        onClick={() => {
          setActive(["cooking", "date", "descending"]);
        }}
      >
        <button id={active.includes('cooking') ? "active" : ""}>Cooking</button>
      </Link>
      <Link
        to="/football"
        onClick={() => {
          setActive(["football", "date", "descending"]);
        }}
      >
        <button id={active.includes('football') ? "active" : ""}>Football</button>
      </Link>
    </nav>
  );
}

export default Nav;
