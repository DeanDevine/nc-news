import { useContext } from "react";
import { UserContext } from "../contexts/User";

function Header({ header }) {
  const { user } = useContext(UserContext);
  return (
    <header>
      <h1>NC News</h1>
      <h2>{header}</h2>
      {user ? <h3>signed in as {user}</h3> : null}
    </header>
  );
}

export default Header;
