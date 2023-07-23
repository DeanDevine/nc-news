import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "./api";
import Error from "./Error";

function UserPage({ setActive }) {
  const [userInfo, setUserInfo] = useState({});
  const [apiError, setApiError] = useState(null);

  const { username } = useParams();

  useEffect(() => {
    setActive([]);
    getUser(username)
      .then((userData) => {
        setUserInfo(userData);
      })
      .catch((err) => {
        setApiError(err);
      });
  }, []);

  if (apiError) {
    return (
      <Error
        errorStatus={apiError.response.status}
        errorMessage={apiError.response.data.msg}
      />
    );
  }

  return (
    <div className={"user-page"}>
      <img
        src={userInfo.avatar_url}
        alt={`${userInfo.username} avatar`}
        style={{ borderRadius: "10%" }}
      />
      <h3>{userInfo.username}</h3>
      <p>Name: {userInfo.name}</p>
    </div>
  );
}

export default UserPage;
