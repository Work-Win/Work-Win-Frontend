import React, { useEffect, useState } from "react";
import HeatmapCalendar from "./HeatmapCalendar";

const Heatmap = () => {
  const [activityData, setActivityData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const todayDate = currentDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD

    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = currentDate.getDay();

    setToday(dayOfWeek); // Set the current day of the week

    const endDate = todayDate;

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
    <section className="mt-16 h-52 w-full flex flex-row justify-center items-center">
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
