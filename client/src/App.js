import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//all blocks imports
import TopBar from "./blocks/TopBar/TopBar";
import EmptyState from "./blocks/EmptyState/EmptyState";
import ActivityCard from "./blocks/ActivityCard/ActivityCard";
import ActivityList from "./blocks/ActivityList/ActivityList";
import UserProvider from "./blocks/User/UserProvider";
import ActivityListProvider from "./blocks/ActivityList/ActivityListProvider";
import HostState from "./blocks/HostState/HostState";
import Layout from "./blocks/Layout/Layout";
import ActivityDetail from "./blocks/ActivityDetail/ActivityDetail";
import ActivityDetailProvider from "./blocks/ActivityDetail/ActivityDetailProvider";
import MR from "./blocks/MR/MR";
import StopWatch from "./blocks/StopWatch/StopWatch";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <ActivityListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HostState />} />
                <Route path="activity" element={<ActivityList />} />
                <Route path="empty" element={<EmptyState />} />
                <Route path="MR" element={<MR />} />

                <Route path="stopwatch" element={<StopWatch />} />
                <Route
                  path="activityDetail"
                  element={
                    <ActivityDetailProvider>
                      <ActivityDetail />
                    </ActivityDetailProvider>
                  }
                />

                <Route path="*" element={"not found"} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ActivityListProvider>
      </UserProvider>
    </div>
  );
}

export default App;
