// Copyright ©2024 ranalimayadunne, All rights reserved.
import React, { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/profile.css";
import { BiEnvelope, BiUser, BiPen } from "react-icons/bi";
import Master from "../assets/Master.png";
import TenCourses from "../assets/10courses.png";
import HundredMarks from "../assets/100marks.png";
import Cloud from "../assets/cloud.png";
import FirstCourse from "../assets/course1.png";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profession, setProfession] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = Cookies.get("email");
        if (userEmail) {
          setEmail(userEmail);
          const response = await axios.get(
            `http://localhost:3001/api/users/${userEmail}`
          );
          const userData = response.data;
          setUsername(userData.username);
          setProfession(userData.profession);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const details = [
    {
      title: "Username",
      data: username,
      icon: <BiUser />,
    },
    {
      title: "Email",
      data: email,
      icon: <BiEnvelope />,
    },
    {
      title: "Profession",
      data: profession,
      icon: <BiPen />,
    },
  ];

  const badges = [Master, Cloud, TenCourses, HundredMarks, FirstCourse];

  return (
    <div className="profile">
      <ProfileHeader />
      <div className="user--profile">
        <div className="user-details">
          {details.map((detail, index) => (
            <div key={index} className="user">
              <div className="user-detail">
                <div className="user-cover">{detail.icon}</div>
                <div className="user-name">
                  <h5 className="title">{detail.title}</h5>
                  <span className="duration">{detail.data}</span>
                </div>
              </div>
              <div className="action">:</div>
            </div>
          ))}

          {/* Badge Section */}
          <div>
            <h3 className="font-semibold ml-1 text-lg font-cursive">
              Achievements:
            </h3>
          </div>
          <div className="badge-container">
            {badges.map((badge, index) => (
              <div key={index} className="badge">
                <img src={badge} alt={`badge-${index}`} />
              </div>
            ))}
          </div>

          {/* Made with quote */}
          <p className="font-cursive font-semibold text-xs text-black text-center uppercase tracking-wider mt-3">
            Made with <span className="text-black text-xl">❤️</span> by{" "}
            <a
              href="https://github.com/ranalimayadunne"
              target="_blank"
              className="text-black hover:text-blue-600 transition-colors duration-300"
            >
              ranalimayadunne
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
