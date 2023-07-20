import { useContext } from "react";
import { HeaderContext } from "../contexts/Header";

function Header() {
  const {header} = useContext(HeaderContext)
  return (
    <header>
      <h1>NC News</h1>
      <h2>{header}</h2>
    </header>
  );
}

export default Header;
