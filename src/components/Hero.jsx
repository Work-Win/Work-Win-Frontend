// Copyright ©2024 ranalimayadunne, All rights reserved.
import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const registerNavigate = () => {
    navigate("/signup");
  };

  return (
    <div className="text-white">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#a8def2] font-bold p-2">
          LEVEL UP YOUR SKILLS, MASTER THE FUTURE
        </p>
        <h1 className="md:text-6.5xl sm:text-6xl text-4xl font-bold md:py-6">
          Accelerate Growth with Modern Learning
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-4xl sm:text-4xl text-xl font-bold py-4 landing-text">
            Fast, flexible access for
          </p>
          <ReactTyped
            className="md:text-4xl sm:text-2xl text-xl font-bold md:pl-4 pl-2"
            strings={[
              "online courses",
              "learning materials",
              "Q`&`A model",
              "recommendations",
              "dicussion areas",
            ]}
            typeSpeed={50}
            backSpeed={50}
            loop
          />
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500">
          Step into the Future of IT Training with Our Immersive & Gamified
          Learning Platform
        </p>
        <button
          className="btnHoverEffect bg-[#a8def2] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black"
          onClick={registerNavigate}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
