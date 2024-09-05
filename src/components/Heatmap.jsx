import React, { useEffect, useState } from "react";
import HeatmapCalendar from "./HeatmapCalendar";

const Heatmap = () => {
  const [activityData, setActivityData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [today, setToday] = useState("");
  const [points, setPoints] = useState(0); // State for points
  const [rank, setRank] = useState(""); // State for rank

  useEffect(() => {
    const currentDate = new Date();
    const todayDate = currentDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD

    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = currentDate.getDay();
    setToday(dayOfWeek);

    const endDate = todayDate;

    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const startDate = oneYearAgo.toISOString().slice(0, 10);

    setStartDate(startDate);
    setEndDate(endDate);

    // Fetch activity data, points, and rank from the server
    fetch("/api/user-activity")
      .then((res) => res.json())
      .then((data) => {
        setActivityData(data.userActivity);
        setPoints(data.points); // Assume API returns points
        setRank(data.rank); // Assume API returns rank
      })
      .catch((err) =>
        console.error("There has been an error while fetching data ", err)
      );
  }, []);

  return (
    <section className="mt-16 w-full flex flex-col items-center">
      {/* Points and Rank in a Single Row Above Heatmap */}
      <div className="w-full flex justify-between items-center mb-4 px-8">
        {/* Points on the left */}
        <div
          className="text-xl font-semibold ml-20"
          style={{ color: "#040e2c" }}
        >
          Points: 542
        </div>

        {/* Rank on the right */}
        <div
          className="text-xl font-semibold mr-11"
          style={{ color: "#040e2c" }}
        >
          Rank: 2
        </div>
      </div>

      {/* Heatmap */}
      <div className="flex">
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
    </section>
  );
};

export default Heatmap;
