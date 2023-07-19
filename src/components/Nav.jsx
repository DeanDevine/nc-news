import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">
        <button>All Articles</button>
      </Link>
      <Link to="/coding">
        <button>Coding</button>
      </Link>
      <Link to="/cooking">
        <button>Cooking</button>
      </Link>
      <Link to="/football">
        <button>Football</button>
      </Link>
    </nav>
  );
}

export default Nav;
