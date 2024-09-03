// Copyright ©2024 ranalimayadunne, All rights reserved.
import React from "react";
import About from "../components/About";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Welcome = () => {
  return (
    <div className="welcomePageContainer">
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </div>
  );
};

export default Welcome;
