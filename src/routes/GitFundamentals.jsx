// Copyright ©2024 ranalimayadunne, All rights reserved.
import React from "react";
import Sidebar from "../components/Sidebar";
import GitFundamentalsContent from "../components/GitFundamentalsContent";
import "../styles/sidebar.css";

const GitFundamentals = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard--content">
        <GitFundamentalsContent />
      </div>
    </div>
  );
};

export default GitFundamentals;
