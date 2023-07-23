import { useContext, useEffect, useState } from "react";
import { getUser, patchUser } from "./api";
import { UserContext } from "../contexts/User";

function UserProfile() {
  const { user } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  const [nameInput, setNameInput] = useState("");
  const [avatarInput, setAvatarInput] = useState("");
  const [showForm, setShowForm] = useState(false);

  if (!user) {
    return (
      <div className="">
        <p className="">You are not signed in</p>
      </div>
    );
  }

  useEffect(() => {
    getUser(user)
      .then((userData) => {
        setUserInfo(userData);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    patchUser(user, nameInput, avatarInput).then((userData) => {
      setUserInfo(userData);
      setNameInput("");
      setAvatarInput("");
      setShowForm(false);
    });
  };

  return (
    <div className={"user-page"}>
      <img
        src={userInfo.avatar_url}
        alt={`${userInfo.username} avatar`}
        style={{ borderRadius: "10%" }}
      />
      <h3>{userInfo.username}</h3>
      <p>Name: {userInfo.name}</p>
      {!showForm && (
        <button onClick={() => setShowForm(!showForm)}>
          {!showForm && "Change Details"}
        </button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="update-name">New name: </label>
          <input
            id="update-name"
            type="text"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
          ></input>
          <p></p>
          <label htmlFor="update-avatar">New avatar url: </label>
          <input
            id="update-avatar"
            type="text"
            value={avatarInput}
            onChange={(e) => {
              setAvatarInput(e.target.value);
            }}
          ></input>
          <p></p>
          <button>Update Details</button>
        </form>
      )}
    </div>
  );
}

export default UserProfile;
