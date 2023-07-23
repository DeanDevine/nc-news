import { useContext, useState } from "react";
import { postUser } from "./api";
import { UserContext } from "../contexts/User";

function CreateUser() {
  const { setUser } = useContext(UserContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [avatarUrlInput, setAvatarUrlInput] = useState("");
  const [response, setResponse] = useState("");
  const [showForm, setShowForm] = useState(false);

  const newUser = {
    username: usernameInput,
    name: nameInput,
    avatar_url: avatarUrlInput,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postUser(newUser)
      .then((userData) => {
        setResponse(
          `User successfully created. You are now signed in as ${userData.username}`
        );
        setUser(userData.username);
        setUsernameInput("");
        setNameInput("");
        setAvatarUrlInput("");
        setShowForm(false);
      })
      .catch((err) => {
        setResponse(err.response.data.msg);
        setUsernameInput("");
        setNameInput("");
        setAvatarUrlInput("");
      });
  };

  return (
    <div>
      {!showForm && (
        <button onClick={() => setShowForm(!showForm)}>
          {!showForm && "New User"}
        </button>
      )}
      {showForm ? (
        <form id="create-user" onSubmit={handleSubmit}>
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
      ) : null}
      <p>{response}</p>
    </div>
  );
}

export default CreateUser;
