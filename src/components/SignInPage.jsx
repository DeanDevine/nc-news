import { useContext, useState } from "react";
import { getUser } from "./api";
import { UserContext } from "../contexts/User";

function SignInPage() {
  const { user, setUser } = useContext(UserContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return (
      <div className="">
        <p className="">You are signed in as {user}</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getUser(usernameInput)
      .then((userData) => {
        setUser(userData.username);
        setResponse(`You have successfully signed in as ${userData.username}`);
        setUsernameInput("");
      })
      .catch(() => {
        setError("Username does not exist");
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
      <p>{error}</p>
    </div>
  );
}

export default SignInPage;
