import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Use react-router-dom

const HeatmapCalendar = ({ startDate, endDate, today }) => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/user-activity")
      .then((res) => res.json())
      .then((data) => setActivityData(data.userActivity))
      .catch((err) =>
        console.error("There has been an error while fetching data ", err)
      );
  }, []);

  let startingDate = new Date(startDate);
  let endingDate = new Date(endDate);

  const daysInMonth =
    Math.ceil((endingDate - startingDate) / (1000 * 60 * 60 * 24)) + 1;

  // Create the calendar grid, but offset the first day based on the current day of the week
  const calendarGrid = Array.from({ length: daysInMonth + today }, (_, i) => {
    if (i < today) {
      return null; // Add empty cells before the first day to align with the current day of the week
    } else {
      const date = new Date(startingDate);
      date.setDate(startingDate.getDate() + (i - today)); // Subtract the offset to adjust for alignment
      return date.toISOString().slice(0, 10);
    }
  });

  const highestValue = activityData?.reduce(
    (a, b) => Math.max(a, b.count),
    -Infinity
  );

  const getIntensity = (activityCount) => {
    return highestValue !== 0 ? Number(activityCount / highestValue) : 0;
  };

  const getColorFromIntensity = (intensity) => {
    const colorCodes = [
      "#FFEEEE",
      "#FFCCCC",
      "#FFAAAA",
      "#FF8888",
      "#FF6666",
      "#FF4444",
    ];
    const colorIndex = Math.min(
      Math.floor(intensity * colorCodes.length),
      colorCodes.length - 1
    );
    return colorCodes[colorIndex];
  };

  return (
    <div
      className="grid grid-flow-col gap-1"
      style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr)" }}
    >
      {calendarGrid.map((day, index) => {
        if (day === null) {
          return <div key={index} className="w-1 h-1"></div>; // Render an empty cell for alignment
        }

        const activityCount =
          activityData.find((item) => item.date === day)?.count || 0;
        const intensity = getIntensity(activityCount);
        const color = getColorFromIntensity(intensity);

        return (
          <Link
            to={`/posts?date=${day}`} // Use 'to' for React Router
            key={day} // Added key to each element
            className="w-2.5 h-2.5 rounded cursor-pointer"
            title={`${activityCount} Posts on ${day}`}
            style={{
              backgroundColor: color,
            }}
          />
        );
      })}
    </div>
  );
};

export default HeatmapCalendar;
