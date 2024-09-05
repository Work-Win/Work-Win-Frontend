// Copyright ©2024 ranalimayadunne, All rights reserved.
import React from "react";
import ContentHeader from "./ContentHeader";
import Card from "./Card";
import Heatmap from "./Heatmap.jsx";
import "../styles/content.css";

const DashboardContent = () => {
  return (
    <div className="content">
      <ContentHeader />
      <Card />
      <Heatmap />
    </div>
  );
};

export default DashboardContent;
