import { useEffect, useState } from "react";
import { postUser } from "./api";

function CreateUser({ setHeader }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [avatarUrlInput, setAvatarUrlInput] = useState();
  const [response, setResponse] = useState("");

  const newUser = {
    username: usernameInput,
    name: nameInput,
    avatar_url: avatarUrlInput,
  };

  useEffect(() => {
    setHeader("create user");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    postUser(newUser)
      .then((userData) => {
        setResponse(`User ${userData.username} successfully created`);
        setUsernameInput("");
        setNameInput("");
        setAvatarUrlInput();
      })
      .catch((err) => {
        setResponse(err.response.data.msg);
        setUsernameInput("");
        setNameInput("");
        setAvatarUrlInput();
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="create-username">Username: </label>
        <input
          id="create-username"
          type="text"
          value={usernameInput}
          onChange={(e) => {
            setUsernameInput(e.target.value);
          }}
        ></input>
        <p></p>
        <label htmlFor="create-username-name">Name: </label>
        <input
          id="create-username-name"
          type="text"
          value={nameInput}
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
        ></input>
        <p></p>
        <label htmlFor="create-username-avatar">Avatar url: </label>
        <input
          id="create-username-avatar"
          type="text"
          value={avatarUrlInput}
          onChange={(e) => {
            setAvatarUrlInput(e.target.value);
          }}
        ></input>
        <p></p>
        <button>Create User</button>
      </form>
      <p>{response}</p>
    </div>
  );
}

export default CreateUser;
