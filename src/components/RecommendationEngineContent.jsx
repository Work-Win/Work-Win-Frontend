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
    const userPreferences = preferencesRef.current.value;

    // Sample recommendations logic based on user preferences
    const recommendationsList = [
      "Course 1: Cloud Fundamentals",
      "Course 2: Advanced Backend Development",
      "Course 3: Project Management Basics",
    ];

    // Simulate recommendation generation based on user input
    const filteredRecommendations = recommendationsList.filter((course) =>
      course.toLowerCase().includes(userPreferences.toLowerCase())
    );

    setRecommendations(
      filteredRecommendations.length > 0
        ? filteredRecommendations
        : ["No recommendations found"]
    );
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
