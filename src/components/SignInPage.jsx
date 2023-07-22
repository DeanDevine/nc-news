import { useContext, useEffect, useState } from "react";
import { getUser } from "./api";
import { UserContext } from "../contexts/User";

function SignInPage({ setHeader }) {
  const { user, setUser } = useContext(UserContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    setHeader("sign in");
    if (user) {
      setResponse(`You are signed in as ${user}`);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getUser(usernameInput)
      .then((userData) => {
        setUser(userData.username);
        setResponse(`You have successfully signed in as ${userData.username}`);
        setUsernameInput("");
      })
      .catch(() => {
        setResponse("Username does not exist");
        setUsernameInput("");
      });
  };

  return (
    <div>
      <form className={user ? "true" : ""} onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          value={usernameInput}
          onChange={(e) => {
            setUsernameInput(e.target.value);
          }}
        ></input>
        <p></p>
        <button>Sign In</button>
      </form>
      <p>{response}</p>
    </div>
  );
}

export default SignInPage;
