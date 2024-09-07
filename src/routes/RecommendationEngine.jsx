// Copyright ©2024 ranalimayadunne, All rights reserved.
import React from "react";
import Sidebar from "../components/Sidebar";
import RecommendationEngineContent from "../components/RecommendationEngineContent";
import "../styles/sidebar.css";

const RecommendationEngine = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard--content">
        <RecommendationEngineContent />
      </div>
    </div>
  );
};

export default RecommendationEngine;
