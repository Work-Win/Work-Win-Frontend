// Copyright ©2024 ranalimayadunne, All rights reserved.
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiHome, BiSolidReport, BiLogOut } from "react-icons/bi";
import { MdReportProblem, MdLeaderboard } from "react-icons/md";
import { GrAchievement } from "react-icons/gr";
import { FaAward } from "react-icons/fa6";
import "../styles/sidebar.css";
import Logo from "../assets/work&win.png";
import Cookies from "js-cookie";

const SidebarItem = ({ icon, text, to }) => {
  const location = useLocation();

  // Check if the current location matches the sidebar item's path
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`item ${isActive ? "active" : ""}`}>
      {icon}
      {text}
    </Link>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();

  const welcomeNavigate = () => {
    navigate("/");
  };

  const loginNavigate = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    Cookies.remove("email");
    sessionStorage.removeItem("chatMessages");

    loginNavigate();
  };

  return (
    <div className="menu">
      <div className="logo">
        <img
          src={Logo}
          className="logo-icon w-[110px] mx-4 my-3 cursor-pointer"
          onClick={welcomeNavigate}
          alt="Logo"
        />
      </div>

      <div className="menu--list">
        <SidebarItem
          to="/dashboard"
          text="Dashboard"
          icon={<BiHome className="icon" />}
        />
        <SidebarItem
          to="/leaderboard"
          text="Leaderboard"
          icon={<MdLeaderboard className="icon" />}
        />
        <SidebarItem
          to="/my-achievements"
          text="Achievements"
          icon={<FaAward className="icon" />}
        />
        <SidebarItem
          to="/user-guide"
          text="User Guide"
          icon={<BiSolidReport className="icon" />}
        />
        <SidebarItem
          to="/feedback"
          text="Feedback"
          icon={<MdReportProblem className="icon" />}
        />
      </div>
      <div className="logout-menu">
        <a href="#" className="item active" onClick={handleLogout}>
          <BiLogOut className="icon-logout" />
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
