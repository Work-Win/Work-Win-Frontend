// Copyright ©2024 ranalimayadunne, All rights reserved.
import React from "react";
import Sidebar from "../components/Sidebar";
import OnlineCoursesContent from "../components/OnlineCoursesContent";
import "../styles/sidebar.css";

const OnlineCourses = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard--content">
        <OnlineCoursesContent />
      </div>
    </div>
  );
};

export default OnlineCourses;
