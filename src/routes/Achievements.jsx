// Copyright ©2024 ranalimayadunne, All rights reserved.
import React from "react";
import Sidebar from "../components/Sidebar";
import AchievementsContent from "../components/AchievementsContent";
import "../styles/sidebar.css";

const Feedback = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard--content">
        <AchievementsContent />
      </div>
    </div>
  );
};

export default Feedback;
