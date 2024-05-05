import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

function UserProvider({ children }) {
  const [userListDto, setUserListDto] = useState({
    state: "ready",
    data: null,
  });
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    setUserListDto((current) => ({ ...current, state: "loading" }));
    fetch(`http://localhost:8000/user/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.status >= 400) {
        setUserListDto({ state: "error", error: responseJson.error });
      } else {
        setUserListDto({ state: "ready", data: responseJson });
      }
    });
  }, []); // Empty dependency array to run only once

  async function addExp(id, activityTimeGoal) {
    try {
      const response = await fetch(`http://localhost:8000/user/addExp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, activityTimeGoal }),
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const value = {
    addExp: addExp,
    userList: userListDto.data || [],
    loggedInUser: loggedInUser
      ? (userListDto.data || []).find((user) => user.id === loggedInUser)
      : null,
    handlerMap: {
      login: setLoggedInUser,
      logout: () => setLoggedInUser(null),
    },
  };

  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
}

export default UserProvider;
