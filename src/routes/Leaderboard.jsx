// Copyright ©2024 ranalimayadunne, All rights reserved.
import React from "react";
import Sidebar from "../components/Sidebar";
import LeaderboardContent from "../components/LeaderboardContent";
import "../styles/sidebar.css";

const Leaderboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard--content">
        <LeaderboardContent />
      </div>
    </div>
  );
};

export default Leaderboard;
