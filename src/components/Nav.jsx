import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">
        <button>All Articles</button>
      </Link>
    </nav>
  );
}

export default Nav;
