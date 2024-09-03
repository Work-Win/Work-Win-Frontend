// Copyright ©2024 ranalimayadunne, All rights reserved.
import React from "react";
import Welcome from "./routes/Welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
