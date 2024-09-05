// Copyright ©2024 ranalimayadunne, All rights reserved.
import React from "react";
import Welcome from "./routes/Welcome";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Dashboard from "./routes/Dashboard";
import UserGuide from "./routes/UserGuide";
import Feedback from "./routes/Feedback";
import EditProfile from "./routes/EditProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-guide" element={<UserGuide />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/dashboard/edit-profile" element={<EditProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
