// Copyright ©2024 ranalimayadunne, All rights reserved.
import React from "react";
import Sidebar from "../components/Sidebar";
import QnAModelContent from "../components/QnAModelContent";
import "../styles/sidebar.css";

const QnAModel = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard--content">
        <QnAModelContent />
      </div>
    </div>
  );
};

export default QnAModel;
