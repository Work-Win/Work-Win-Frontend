// Copyright ©2024 ranalimayadunne, All rights reserved.
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  // Get the weekday of the starting date (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const startDayOfWeek = startingDate.getDay();

  // Adjust grid creation to take startDayOfWeek into account
  const calendarGrid = Array.from(
    { length: daysInMonth + startDayOfWeek },
    (_, i) => {
      if (i < startDayOfWeek) {
        return null; // Filler for the days before the start date
      } else {
        const date = new Date(startingDate);
        date.setDate(startingDate.getDate() + (i - startDayOfWeek));
        return date.toISOString().slice(0, 10);
      }
    }
  );

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
      "#B2EBF2",
      "#80DEEA",
      "#4DD0E1",
      "#26C6DA",
      "#00ACC1",
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
          return <div key={index} className="w-1 h-1"></div>;
        }

        const activityCount =
          activityData.find((item) => item.date === day)?.count || 0;
        const intensity = getIntensity(activityCount);
        const color = getColorFromIntensity(intensity);

        return (
          <Link
            to={`/posts?date=${day}`}
            key={day}
            className="w-2.5 h-2.5 rounded cursor-pointer"
            title={`${activityCount} Points on ${day}`}
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
