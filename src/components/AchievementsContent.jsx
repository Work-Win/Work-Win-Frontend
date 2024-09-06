// Copyright ©2024 ranalimayadunne, All rights reserved.
import React from "react";
import "../styles/achievements.css"; // Make sure to create this file if it doesn't exist yet
import Master from "../assets/Master.png";
import TenCourses from "../assets/10courses.png";
import HundredMarks from "../assets/100marks.png";
import Cloud from "../assets/cloud.png";
import FirstCourse from "../assets/course1.png";

const AchievementsContent = () => {
  const badges = [
    {
      image: Master,
      title: "Master",
      description:
        "Awarded for earning the maximum points among the users, representing mastery of the material and top performance across the platform.",
    },
    {
      image: Cloud,
      title: "Cloud Navigator",
      description: "Awarded for completing all the cloud-related courses.",
    },
    {
      image: TenCourses,
      title: "Decader",
      description:
        "Awarded after successfully completing ten courses across the platform",
    },
    {
      image: HundredMarks,
      title: "Quiz Champion",
      description: "Awarded for scoring 100 marks across multiple quizzes.",
    },
    {
      image: FirstCourse,
      title: "First Step",
      description: "Awarded for completing the first course of the platform",
    },
  ];

  return (
    <div>
      <div className="content--header">
        <h1 className="header--title">My Achievements</h1>
      </div>
      <div className="achievements-grid">
        {badges.map((badge, index) => (
          <div className="achievement-card" key={index}>
            <img src={badge.image} alt={badge.title} className="badge-image" />
            <h3 className="font-bold text-xl">{badge.title}</h3>
            <p>{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsContent;
