// Copyright ©2024 ranalimayadunne, All rights reserved.
import React from "react";
import { useNavigate } from "react-router-dom";
import eGovernance from "../assets/eGovernance.png";
import { TfiArrowCircleRight } from "react-icons/tfi";

const About = () => {
  const navigate = useNavigate();

  const userGuidePageNavigate = () => {
    navigate(
      "https://github.com/iServeSL/iServeSL-Docs/blob/main/iServeSL%20-%20User%20Guide.md"
    );
  };

  return (
    <div className="w-full bg-white py-16 px-4 aboutPageContainer">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img className="w-[500px] mx-auto my-4" src={eGovernance} alt="/" />
        <div className="flex flex-col justify-center">
          <p className="text-[#0693c9] font-bold ">
            STREAMLINING & EMPOWERING EMPLOYEE TRAINING
          </p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Master IT Skills with Gamified Learning
          </h1>
          <p>
            "Work & Win" revolutionizes IT training with its gamified platform
            designed for today’s fast-paced tech industry. By combining engaging
            gamification techniques with advanced AI features—like an
            interactive Q&A model, and personalized recommendations—"Work & Win"
            provides IT professionals with a dynamic and immersive learning
            environment. This innovative approach not only keeps employees
            updated with the latest technologies but also fosters continuous
            growth and career advancement.
          </p>
          <a
            href="https://github.com/Work-Win/Work-Win-Documentation/blob/main/User%20Guide.md"
            target="_blank"
          >
            <button className="btnAboutHoverEffect bg-[#0693c9] text-black w-[200px] rounded-md font-medium my-6 py-3 flex justify-center">
              User Guide
              <TfiArrowCircleRight TopRight size={20} className="ml-2 mt-1" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
