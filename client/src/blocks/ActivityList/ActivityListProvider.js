import { useEffect, useState, useContext } from "react";
import { ActivityListContext } from "./ActivityListContext";
import { UserContext } from "../../blocks/User/UserContext";

function ActivityListProvider({ children }) {
  const { loggedInUser } = useContext(UserContext);
  const [activityLoadObject, setActivityLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setActivityLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/activity/getAll`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setActivityLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setActivityLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setActivityLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/activity/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setActivityLoadObject((current) => {
        // Check if the new activity already exists in the list
        const existingActivityIndex = current.data.findIndex(
          (activity) => activity.id === responseJson.id
        );

        if (existingActivityIndex === -1) {
          // If not, add it to the list
          const newData = [...current.data, responseJson];

          return { state: "ready", data: newData };
        } else {
          // If it exists, just return the current state
          return current;
        }
      });
      return responseJson;
    } else {
      setActivityLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }
  const value = {
    state: activityLoadObject.state,
    activityList: activityLoadObject.data || [],

    handlerMap: { handleCreate, handleLoad },
  };

  return (
    <ActivityListContext.Provider value={value}>
      {children}
    </ActivityListContext.Provider>
  );
}

export default ActivityListProvider;
