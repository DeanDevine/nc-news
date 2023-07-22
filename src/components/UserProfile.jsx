import { useContext, useEffect, useState } from "react";
import { getUser } from "./api";
import { UserContext } from "../contexts/User";

function UserProfile({ setHeader }) {
  const { user } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(true);

  if (!user) {
    return (
      <div className="">
        <p className="">You are not signed in</p>
      </div>
    );
  }

  useEffect(() => {
    setHeader(`${user} user profile`);
    getUser(user)
      .then((userData) => {
        setUserInfo(userData);
      })
      .catch(() => {
        setIsSignedIn(false);
      });
  }, []);

  return (
    <div className={"user-page"}>
      {!isSignedIn ? <p>Please sign in to view comments</p> : null}
      <img
        src={userInfo.avatar_url}
        alt={`${userInfo.username} avatar`}
        style={{ borderRadius: '10%' }}
      />
      <h3>{userInfo.username}</h3>
      <p>Name: {userInfo.name}</p>
    </div>
  );
}

export default UserProfile;
