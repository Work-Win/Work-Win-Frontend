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

  const updateProgressAndStatus = (points) => {
    if (points < 100) {
      setStatusLeft("Rising Star");
      setStatusRight("Performer");
      setProgress((points / 100) * 100);
    } else if (points < 300) {
      setStatusLeft("Performer");
      setStatusRight("Trailblazer");
      setProgress(((points - 100) / 200) * 100);
    } else if (points < 600) {
      setStatusLeft("Trailblazer");
      setStatusRight("Master Achiever");
      setProgress(((points - 300) / 300) * 100);
    } else {
      setStatusLeft("Trailblazer");
      setStatusRight("Master Achiever");
      setProgress(100);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3001/api/user-activity")
        .then((res) => res.json())
        .then((data) => {
          setActivityData(data);
          console.log(data); // Directly set data as it's already an array
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
    const todayDate = currentDate.toISOString().slice(0, 10);
    const dayOfWeek = currentDate.getDay();
    setToday(dayOfWeek);

    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const startDate = oneYearAgo.toISOString().slice(0, 10);

    setStartDate(startDate);
    setEndDate(todayDate);

    fetchData();
    fetchUserData();

    const intervalId1 = setInterval(fetchData, 60000); // Update every 60 seconds
    const intervalId2 = setInterval(fetchUserData, 60000);

    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
    };
  }, []);

  useEffect(() => {
    updateProgressAndStatus(points);
  }, [points]);

  return (
    <section className="cardHeatmap mt-10 w-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-2 px-8 mt-4">
        <div
          className="text-xl font-semibold ml-20"
          style={{ color: "#035270" }}
        >
          Total Points Earned: {points}
        </div>
        <div
          className="text-xl font-semibold mr-20"
          style={{ color: "#035270" }}
        >
          Rank: {rank}
        </div>
      </div>

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

      <div className="w-full flex flex-col items-center mb-4">
        <h2 className="text-xl font-semibold mb-2" style={{ color: "#035270" }}>
          Mastery Level: <span style={{ color: "#c6a90c" }}>Trailblazer</span>
        </h2>
        <div className="w-full flex justify-center items-center">
          <div
            className="mr-4 text-lg font-medium"
            style={{ color: "#035270" }}
          >
            {statusLeft}
          </div>
          <div className="relative w-2/3">
            <div
              className="relative w-full h-4 rounded-full overflow-hidden"
              style={{ backgroundColor: "#8a9aa6" }}
            >
              <div
                className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div
            className="ml-4 text-lg font-medium"
            style={{ color: "#035270" }}
          >
            {statusRight}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heatmap;
