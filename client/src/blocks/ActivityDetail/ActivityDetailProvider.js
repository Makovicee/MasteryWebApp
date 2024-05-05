import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { ActivityDetailContext } from "./ActivityDetailContext";

function ActivityProvider({ children }) {
  const [activityLoadObject, setActivityLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setActivityLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/activity/getById?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
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

  async function handleDelete() {
    const id = new URLSearchParams(location.search).get("id");

    setActivityLoadObject((current) => ({ ...current, state: "pending" }));

    try {
      const response = await fetch(
        `http://localhost:8000/activity/del?id=${id}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        setActivityLoadObject({ state: "ready", data: null });
        navigate("/activity"); // Redirect after successful deletion
      } else if (response.status === 404) {
        console.error("Activity not found");
        // No need to set error state or log message for 404 response
      } else {
        console.error("Error deleting activity:", response.statusText);
        setActivityLoadObject((current) => ({
          state: "error",
          data: current.data,
          error: response.statusText,
        }));
      }
    } catch (error) {
      console.error("Error deleting activity:", error.message);
      setActivityLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: error.message,
      }));
    }
  }

  async function handleUpdate(claimed) {
    const id = new URLSearchParams(location.search).get("id");
    setActivityLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch("http://localhost:8000/activity/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, claimed: claimed }),
    });
    const responseJson = await response.json();
    if (response.ok) {
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

  const value = {
    activity: activityLoadObject.data,
    handleDelete: handleDelete,
    handleUpdate: handleUpdate,
    handleLoad: handleLoad,
  };

  return (
    <ActivityDetailContext.Provider value={value}>
      {children}
    </ActivityDetailContext.Provider>
  );
}

export default ActivityProvider;
