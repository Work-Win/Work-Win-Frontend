// Copyright ©2024 ranalimayadunne, All rights reserved.
import React from "react";
import { BiSolidConversation } from "react-icons/bi";
import { MdRecommend } from "react-icons/md";
import { GrBook } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Online Courses",
    icon: <GrBook />,
    route: "/dashboard/online-courses",
  },
  {
    title: "Q & A",
    icon: <BiSolidConversation />,
    route: "/dashboard/qna-model",
  },
  {
    title: "Recommendations",
    icon: <MdRecommend />,
    route: "/dashboard/recommendations",
  },
];

const Card = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="card--container">
      {services.map((item) => (
        <div className="card" onClick={() => handleCardClick(item.route)}>
          <div className="card--cover">{item.icon}</div>
          <div className="card--title">
            <h2 className="item-title">{item.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
