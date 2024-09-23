// Copyright ©2024 ranalimayadunne, All rights reserved.
import React, { useEffect, useState } from "react";
import HeatmapCalendar from "./HeatmapCalendar";
import axios from "axios";
import Cookies from "js-cookie";

const Heatmap = () => {
  const [activityData, setActivityData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [today, setToday] = useState("");
  const [points, setPoints] = useState(0); // State for points
  const [rank, setRank] = useState(""); // State for rank
  const [progress, setProgress] = useState(0); // State for progress bar
  const [statusLeft, setStatusLeft] = useState("Rising Star"); // Left status
  const [statusRight, setStatusRight] = useState("Performer"); // Right status

  // Function to update progress bar and statuses based on points
  const updateProgressAndStatus = (points) => {
    if (points < 100) {
      // Rising Star to Performer
      setStatusLeft("Rising Star");
      setStatusRight("Performer");
      setProgress((points / 100) * 100); // Progress from 0 to 100
    } else if (points < 300) {
      // Performer to Trailblazer
      setStatusLeft("Performer");
      setStatusRight("Trailblazer");
      setProgress(((points - 100) / 200) * 100); // Progress from 100 to 300
    } else if (points < 600) {
      // Trailblazer to Master Achiever
      setStatusLeft("Trailblazer");
      setStatusRight("Master Achiever");
      setProgress(((points - 300) / 300) * 100); // Progress from 300 to 600
    } else {
      // Max progress - Master Achiever
      setStatusLeft("Trailblazer");
      setStatusRight("Master Achiever");
      setProgress(100); // Fully completed
    }
  };

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3001/api/user-activity")
        .then((res) => res.json())
        .then((data) => {
          setActivityData(data.userActivity);
          // setRank(1); // Assume API returns rank
          // setPoints(500); // Set the points
        })
        .catch((err) =>
          console.error("There has been an error while fetching data ", err)
        );
    };

    const fetchUserData = async () => {
      try {
        const email = Cookies.get("email");
        if (email) {
          const response = await axios.get(
            `http://localhost:3001/api/users/${email}`
          );
          const userData = response.data;
          setRank(userData.rank);
          setPoints(userData.highscore);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const currentDate = new Date();
    const todayDate = currentDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD

    const dayOfWeek = currentDate.getDay();
    setToday(dayOfWeek);

    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const startDate = oneYearAgo.toISOString().slice(0, 10);

    setStartDate(startDate);
    setEndDate(todayDate);

    fetchData(); // Initial fetch
    fetchUserData();
    const intervalId1 = setInterval(fetchData, 60000); // Update every 60 seconds
    const intervalId2 = setInterval(fetchUserData, 60000);

    return () => clearInterval(intervalId1, intervalId2); // Cleanup interval on component unmount
  }, []);

  // Update progress and status whenever `points` changes
  useEffect(() => {
    updateProgressAndStatus(points);
  }, [points]);

  return (
    <section className="cardHeatmap mt-10 w-full flex flex-col items-center">
      {/* Points and Rank in a Single Row Above Heatmap */}
      <div className="w-full flex justify-between items-center mb-2 px-8 mt-4">
        {/* Points on the left */}
        <div
          className="text-xl font-semibold ml-20"
          style={{ color: "#035270" }}
        >
          Total Points Earned: {points}
        </div>

        {/* Rank on the right */}
        <div
          className="text-xl font-semibold mr-20"
          style={{ color: "#035270" }}
        >
          Rank: {rank}
        </div>
      </div>

      {/* Heatmap */}
      <div
        className="flex mb-3 p-6 rounded-md"
        style={{ backgroundColor: "#bcc6d1" }}
      >
        <span className="flex flex-col justify-around py-2 text-black text-xs text-right pr-3">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </span>
        <HeatmapCalendar
          startDate={startDate}
          endDate={endDate}
          dataValues={activityData}
          today={today}
        />
      </div>

      {/* Skill Rank Section */}
      <div className="w-full flex flex-col items-center mb-4">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-2" style={{ color: "#035270" }}>
          Mastery Level: <span style={{ color: "#c6a90c" }}>Trailblazer</span>
        </h2>
        {/* Progress Bar for Skill Rank */}
        <div className="w-full flex justify-center items-center">
          {/* Left Label */}
          <div
            className="mr-4 text-lg font-medium"
            style={{ color: "#035270" }}
          >
            {statusLeft}
          </div>

          {/* Progress Bar */}
          <div className="relative w-2/3">
            <div
              className="relative w-full h-4 rounded-full overflow-hidden"
              style={{ backgroundColor: "#8a9aa6" }} // Unfilled background color
            >
              <div
                className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                style={{ width: `${progress}%` }} // Dynamic progress width
              ></div>
            </div>
          </div>

          {/* Right Label */}
          {statusRight && (
            <div
              className="ml-4 text-lg font-medium"
              style={{ color: "#035270" }}
            >
              {statusRight}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Heatmap;
