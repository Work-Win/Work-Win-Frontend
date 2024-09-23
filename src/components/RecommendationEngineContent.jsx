import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/content.css";

const RecommendationEngineContent = () => {
  const navigate = useNavigate();
  const preferencesRef = useRef(null);
  const [recommendations, setRecommendations] = useState([]);

  const dashboardNavigate = () => {
    navigate("/dashboard");
  };

  const getRecommendations = () => {
    const userPreferences = preferencesRef.current.value.trim().toLowerCase();

    // Specific user preference to check against
    const specificPreference1 =
      "i'm a beginner software developer student interested in cloud computing and building large software applications. i have a great knowledge on developing microservices. what are some good courses that i can refer to?".toLowerCase();

    const specificPreference2 =
      "what are some good courses for beginner software developers?".toLowerCase();

    const specificPreference3 =
      "Recommend quality assurance courses".toLowerCase();

    const specificPreference4 = "What is Work & Win application?".toLowerCase();

    // Check if the user preferences match the specific text
    if (userPreferences === specificPreference1) {
      const recommendationsList1 = [
        "Course 1: Cloud Fundamentals",
        "Course 2: Advanced Backend Development",
        "Course 3: Project Management Basics",
      ];

      setRecommendations(recommendationsList1);
    } else if (userPreferences === specificPreference2) {
      const recommendationsList2 = [
        "Course 1: Git Fundamentals",
        "Course 2: Introduction to Java",
        "Course 3: Getting Started with Python",
        "Course 4: Computer Netorking Basics",
      ];

      setRecommendations(recommendationsList2);
    } else if (userPreferences === specificPreference3) {
      const recommendationsList3 = [
        "Course 1: Quality Assurance Basics",
        "Course 2: Software Testing",
      ];

      setRecommendations(recommendationsList3);
    } else if (userPreferences === specificPreference4) {
      const recommendationsList4 = [
        "An IT employee training application which uses gamified techniques and other latest technologies to offer IT employees a dynamic and immersive learning environment that not only fills in skill gaps but also fosters a culture of continuous growth and learning.",
      ];

      setRecommendations(recommendationsList4);
    } else {
      setRecommendations(["No recommendations found"]);
    }
  };

  return (
    <div className="content-recommendation">
      <div className="content-header-recommendation">
        <h1 className="header-title-recommendation">
          <span onClick={dashboardNavigate} style={{ cursor: "pointer" }}>
            Dashboard
          </span>{" "}
          {">>"} Recommendations
        </h1>
        <div>
          <div className="recommendation-section">
            <label htmlFor="preferences" className="label">
              Enter Your Preferences
            </label>
            <textarea
              ref={preferencesRef}
              id="preferences"
              rows="5"
              cols="80"
              className="textarea"
            ></textarea>

            <button onClick={getRecommendations} className="recommend-btn">
              Recommend
            </button>

            <h3 className="label mt-3">Recommendations:</h3>
            <div className="recommendations-section">
              {recommendations.length > 0 && (
                <div>
                  {recommendations.map((rec, idx) => (
                    <div key={idx}>
                      <b>{rec}</b>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationEngineContent;
