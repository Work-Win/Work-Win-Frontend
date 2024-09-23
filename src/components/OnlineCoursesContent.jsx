import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Git from "../assets/git.jpg";
import Microservices from "../assets/microservices.png";
import ResponsiveWeb from "../assets/responsive.jpg";
import QAB from "../assets/qabasics.png";
import NetBasics from "../assets/netbasics.jpg";
import CloudArchi from "../assets/cloudarchi.jpeg";
import OOP from "../assets/oop.jpg";
import Python from "../assets/Python.jpg";
import Security from "../assets/security.jpeg";
import aws from "../assets/aws.jpeg";
import Java from "../assets/java.jpg";
import Testing from "../assets/testing.jpg";
import "../styles/content.css";

const OnlineCoursesContent = () => {
  const navigate = useNavigate();
  const [courseStatuses, setCourseStatuses] = useState([]);

  const courses = [
    { id: 1, image: Git, title: "Git Fundamentals", points: 40 },
    {
      id: 2,
      image: Microservices,
      title: "Microservices Architecture",
      points: 30,
    },
    {
      id: 3,
      image: ResponsiveWeb,
      title: "Responsive Web Development",
      points: 80,
    },
    { id: 4, image: QAB, title: "Quality Assurance Basics", points: 20 },
    {
      id: 5,
      image: NetBasics,
      title: "Computer Networking Basics",
      points: 20,
    },
    {
      id: 6,
      image: CloudArchi,
      title: "Cloud Computing Architecture",
      points: 60,
    },
    { id: 7, image: OOP, title: "Object Oriented Programming", points: 100 },
    { id: 8, image: Python, title: "Getting started with Python", points: 40 },
    {
      id: 9,
      image: Security,
      title: "Internet History & Security",
      points: 20,
    },
    { id: 10, image: aws, title: "Cloud Computing with AWS", points: 100 },
    { id: 11, image: Java, title: "Introduction to Java", points: 40 },
    { id: 12, image: Testing, title: "Software Testing", points: 50 },
  ];

  useEffect(() => {
    const fetchCourseStatuses = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/course-status");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCourseStatuses(data);
      } catch (error) {
        console.error("Error fetching course statuses:", error);
      }
    };

    fetchCourseStatuses();
  }, []);

  const dashboardNavigate = () => {
    navigate("/dashboard");
  };

  const getCourseStatus = (title) => {
    const status = courseStatuses.find((course) => course.title === title);
    return status ? status.completed : false; // Default to false if not found
  };

  return (
    <div>
      <div className="content--header">
        <h1 className="header--title">
          <span onClick={dashboardNavigate} style={{ cursor: "pointer" }}>
            Dashboard
          </span>{" "}
          {">>"} Online Courses
        </h1>
      </div>
      <div className="course-container">
        {courses.map((course) => (
          <div
            key={course.id}
            className="course-card"
            onClick={() =>
              navigate(
                `/dashboard/online-courses/${course.title
                  .toLowerCase()
                  .replace(/ /g, "-")}`
              )
            }
          >
            <img
              src={course.image}
              alt={course.title}
              className="course-image"
            />
            <div className="course-info">
              <h2 className="course-title">{course.title}</h2>
              <div className="course-details">
                <span
                  className={`status-indicator ${
                    getCourseStatus(course.title) ? "completed" : "incomplete"
                  }`}
                >
                  {getCourseStatus(course.title)
                    ? "✔️ Completed"
                    : "❌ Incomplete"}
                </span>
                <span className="course-points">Points: {course.points}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineCoursesContent;
