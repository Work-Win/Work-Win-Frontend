// Copyright ©2024 ranalimayadunne, All rights reserved.
import React, { useEffect, useState } from "react";
import GoldMedal from "../assets/gold-medal.png";
import SilverMedal from "../assets/silver-medal.png";
import BronzeMedal from "../assets/bronze-medal.png";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/content.css";

const LeaderboardContent = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = Cookies.get("email");
        if (email) {
          const response = await axios.get(
            `http://localhost:3001/api/users/${email}`
          );
          const userData = response.data;
          setPoints(userData.highscore);
          console.log(points);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Fixed data for leaderboard
  const leaderboardData = [
    { rank: "1", name: "ranali", mastery: "Trailblazer", points: points },
    { rank: "2", name: "sachinakash_", mastery: "Trailblazer", points: 460 },
    { rank: "3", name: "chanuli", mastery: "Trailblazer", points: 400 },
    { rank: "4", name: "danul", mastery: "Trailblazer", points: 330 },
    { rank: "5", name: "renuka", mastery: "Trailblazer", points: 300 },
    { rank: "6", name: "dhammika", mastery: "Performer", points: 280 },
    { rank: "7", name: "sathika", mastery: "Performer", points: 260 },
    { rank: "8", name: "asanka", mastery: "Performer", points: 240 },
  ];

  return (
    <div className="content-feedback">
      <div className="content--header">
        <h1 className="header--title mb-2">Leaderboard {">>"} Super 8</h1>
      </div>
      <div className="request--content">
        {/* Titles Row */}
        <div className="w-full max-w-screen-xl px-4 mx-auto lg:px-12 ml-16 mb-2">
          <div className="relative overflow-hidden bg-gray-200 text-gray-700 font-bold shadow-md dark:bg-gray-800 sm:rounded-xl h-14">
            <div className="grid grid-cols-4 gap-4 p-4">
              <div className="col-span-1 text-center">
                <span>Rank</span>
              </div>
              <div className="col-span-1 text-center">
                <span>Name</span>
              </div>
              <div className="col-span-1 text-center">
                <span>Mastery</span>
              </div>
              <div className="col-span-1 text-center">
                <span>Points</span>
              </div>
            </div>
          </div>
        </div>

        {/* Render leaderboard data */}
        {leaderboardData.map((request) => (
          <div key={request.rank} className="leader-board-member mb-2">
            <div className="w-full max-w-screen-xl px-4 mx-auto lg:px-12 ml-16">
              <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg h-14">
                <div className="grid grid-cols-4 gap-4 p-4">
                  <div className="col-span-1 text-center">
                    {/* Conditionally render medal icons for top 3 ranks */}
                    {request.rank === "1" && (
                      <img
                        src={GoldMedal}
                        alt="Gold Medal"
                        className="w-8 h-8 ml-24"
                      />
                    )}
                    {request.rank === "2" && (
                      <img
                        src={SilverMedal}
                        alt="Silver Medal"
                        className="w-8 h-8 ml-24"
                      />
                    )}
                    {request.rank === "3" && (
                      <img
                        src={BronzeMedal}
                        alt="Bronze Medal"
                        className="w-8 h-8 ml-24"
                      />
                    )}
                    {request.rank !== "1" &&
                      request.rank !== "2" &&
                      request.rank !== "3" && (
                        <h5 className="dark:text-white font-semibold text-lg">
                          {request.rank}
                        </h5>
                      )}
                  </div>
                  <div className="col-span-1 text-center">
                    <p className="text-gray-800 text-base font-semibold">
                      {request.name}
                    </p>
                  </div>
                  <div className="col-span-1 text-center">
                    <p
                      className="text-base font-semibold"
                      style={{
                        color:
                          request.mastery === "Trailblazer"
                            ? "#c6a90c"
                            : "#035270",
                      }}
                    >
                      {request.mastery}
                    </p>
                  </div>
                  <div className="col-span-1 text-center">
                    <p className="text-green-700 text-base font-semibold">
                      {request.points}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardContent;
