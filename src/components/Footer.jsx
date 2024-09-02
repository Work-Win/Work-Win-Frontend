// Copyright ©2024 ranalimayadunne, All rights reserved.
import React, { useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaLinkedinIn,
} from "react-icons/fa";
import Logo from "../assets/work&win.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const registerNavigate = () => {
    navigate("/signup");
  };

  const loginNavigate = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
        <div>
          <div className="flex justify-start items-center">
            <img className="w-[76px] my-4 -mx-2 mb-0" src={Logo} alt="Logo" />
            <h1 className="text-3xl font-medium mx-6 -mb-3 text-[#a8def2]">
              WORK & WIN
            </h1>
          </div>
          <p className="py-4">
            Elevate your IT skills with a gamified platform that makes learning
            engaging, interactive, and tailored to your needs. Experience a new
            era of training where skill development is dynamic and efficient.
          </p>
          <div className="flex justify-between md:w-[75%] my-6">
            <a
              href="https://www.linkedin.com/in/ranali-mayadunne/"
              target="_blank"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              <FaLinkedinIn size={30} />
            </a>
            <a
              href="https://www.instagram.com/ranalimayadunne/"
              target="_blank"
              className="hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61563368796909"
              target="_blank"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://github.com/ranalimayadunne"
              target="_blank"
              className="hover:text-gray-700 transition-colors duration-300"
            >
              <FaGithub size={30} />
            </a>
          </div>
        </div>
        <div className="lg:col-span-2 flex justify-center mt-6">
          <div className="mx-20">
            <h6 className="font-medium text-gray-400">Services</h6>
            <ul>
              <li className="py-2 text-sm text-white">Online Courses</li>
              <li className="py-2 text-sm text-white">Gamified Learning</li>
              <li className="py-2 text-sm text-white">Recommendations</li>
              <li className="py-2 text-sm text-white">Feedback</li>
              <li className="py-2 text-sm text-white">Security</li>
            </ul>
          </div>
          <div className="mx-20">
            <h6 className="font-medium text-gray-400">Support</h6>
            <ul>
              <li className="py-2 text-sm text-white">Documentation</li>
              <li className="py-2 text-sm text-white">Online Forums</li>
              <li className="py-2 text-sm text-white">Q&A Model</li>
              <li className="py-2 text-sm text-white">Guides</li>
            </ul>
          </div>
          <div className="mx-20">
            <h6 className="font-medium text-gray-400">Work&Win</h6>
            <ul>
              <li className="py-2 text-sm hoverEffect text-white">Home</li>
              <li className="py-2 text-sm hoverEffect text-white">About</li>
              <li
                className="py-2 text-sm hoverEffect text-white"
                onClick={registerNavigate}
              >
                Register
              </li>
              <li
                className="py-2 text-sm hoverEffect text-white"
                onClick={loginNavigate}
              >
                Account
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#1d4d7b] max-w-[100%] mx-auto py-2 px-4 grid text-gray-300 justify-center">
        <p>Copyright ©2024 Ranali Mayadunne, All rights reserved.</p>
      </div>
    </>
  );
};

export default Footer;
