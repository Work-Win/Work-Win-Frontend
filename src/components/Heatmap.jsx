import React, { useEffect, useState } from "react";
import HeatmapCalendar from "./HeatmapCalendar";

const Heatmap = () => {
  const [activityData, setActivityData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [today, setToday] = useState(""); // Store today's day

  useEffect(() => {
    // Calculate today's date
    const currentDate = new Date();
    const todayDate = currentDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD

    // Adjust the day of the week to treat Monday as day 0
    let dayOfWeek = currentDate.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
    dayOfWeek = (dayOfWeek + 6) % 7; // Shift so Monday becomes day 0, Sunday becomes day 6

    setToday(dayOfWeek); // Set the adjusted day of the week

    // Set the end date as today
    const endDate = todayDate;

    // Calculate the date one year ago
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const startDate = oneYearAgo.toISOString().slice(0, 10); // Format as YYYY-MM-DD

    setStartDate(startDate);
    setEndDate(endDate);

    // Fetch activity data from the server
    fetch("/api/user-activity")
      .then((res) => res.json())
      .then((data) => setActivityData(data.userActivity))
      .catch((err) =>
        console.error("There has been an error while fetching data ", err)
      );
  }, []);

  return (
    <section
      className="mt-16 h-52 w-full flex flex-row justify-center items-center"
      //   style={{ backgroundColor: "#040e2c" }}
    >
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
          today={today} // Pass today's adjusted day of the week
        />
      </div>
    </section>
  );
};

export default Heatmap;
