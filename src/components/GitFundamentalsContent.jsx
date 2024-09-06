import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import GitQuizComponent from "./GitQuizComponent";
import Logo from "../assets/work&win.png";
import "../styles/content.css";

const GitFundamentalsContent = () => {
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0); // Track quiz score
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate("/dashboard/online-courses");
  };

  const dashboardNavigate = () => {
    navigate("/dashboard");
  };

  const onlineCoursesNavigate = () => {
    navigate("/dashboard/online-courses");
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="content-course">
      <div className="content--header">
        <h1 className="header--title">
          <span onClick={dashboardNavigate} style={{ cursor: "pointer" }}>
            Dashboard
          </span>{" "}
          {">> "}{" "}
          <span onClick={onlineCoursesNavigate} style={{ cursor: "pointer" }}>
            Online Courses
          </span>{" "}
          {">> "}Git Fundamentals
        </h1>
      </div>

      {/* Render the content based on the current step */}
      {step === 1 && (
        <div className="video-container">
          <iframe
            width="100%"
            height="500px"
            src="https://www.youtube.com/embed/8JJ101D3knE"
            title="Git Fundamentals Video"
            allowFullScreen
          ></iframe>
          <button className="next-button-first" onClick={handleNext}>
            Next
            <GrChapterNext className="mt-1" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="reading-material">
          <h2 className="font-bold text-xl">Reading Material</h2>
          <p>
            Git is a distributed version control system that allows you to track
            changes to your files over time. This means that every developer on
            your team has a complete copy of the project's history, making it
            easy to collaborate and work independently.
          </p>
          <br />
          <h3 className="font-bold text-medium">Key Features of the Git.</h3>
          <ul className="list-disc ml-10">
            <li>
              Version control: Git keeps track of every change you make to your
              files, allowing you to revert to previous versions if necessary.
            </li>
            <li>
              Branching: You can create different branches of your project to
              work on separate features or bug fixes without affecting the main
              codebase.
            </li>
            <li>
              Merging: Once you're done with a branch, you can merge it back
              into the main branch to incorporate your changes.
            </li>
            <li>
              Collaboration: Git makes it easy for multiple people to work on
              the same project simultaneously.
            </li>
            <li>
              Distributed: Each developer has a complete copy of the project's
              history, making it more resilient to failures.
            </li>
          </ul>
          <br />
          <h3 className="font-bold text-medium">Common Git Workflows.</h3>
          <ul className="list-disc ml-10">
            <li>
              Centralized workflow: A single repository is used as the main
              source of truth, and developers push their changes to it.
            </li>
            <li>
              Gitflow workflow: A more complex workflow that defines specific
              branches for different types of work, such as development,
              release, and hotfix.
            </li>
            <li>
              Feature branch workflow: A simpler workflow where developers
              create branches for each new feature or bug fix.
            </li>
          </ul>
          <br />
          <h3 className="font-bold text-medium">
            Popular Git Hosting Services
          </h3>
          <ul className="list-disc ml-10">
            <li>
              GitHub: The most popular Git hosting platform, offering features
              like issue tracking, project management, and collaboration tools.
            </li>
            <li>
              GitLab: Another popular Git hosting platform with similar features
              to GitHub, as well as additional features like CI/CD pipelines.
            </li>
            <li>
              Bitbucket: A Git hosting platform owned by Atlassian, with a focus
              on collaboration and integration with other Atlassian tools.
            </li>
          </ul>
          <div className="navigation-buttons">
            <button className="prev-button" onClick={handlePrev}>
              <GrChapterPrevious className="mt-1" />
              Prev
            </button>
            <button className="next-button" onClick={handleNext}>
              Next
              <GrChapterNext className="mt-1" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="quiz-section">
            <h2 className="font-bold text-xl mb-2 mt-2">
              Quiz: Git Fundamentals
            </h2>
            <GitQuizComponent
              onSubmit={(percentage) => {
                if (percentage >= 80) {
                  // Course is completed
                  setModalContent(
                    <>
                      Congratulations! You have passed the
                      <strong> Git Fundamentals </strong>course!
                      <br />
                      Your Score: <strong>{percentage}%</strong>
                    </>
                  );
                  setModalOpen(true);
                } else {
                  setModalContent(
                    <>
                      You need at least 80% to complete the course.. TRY
                      AGAIN!!!
                      <br />
                      Your Score: <strong>{percentage}%</strong>
                    </>
                  );
                  setModalOpen(true);
                }
              }}
            />
          </div>
          <button className="prev-button" onClick={handlePrev}>
            <GrChapterPrevious className="mt-1" />
            Prev
          </button>
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay">
          <dialog
            id="my_modal_5"
            className="modal modal-center"
            open
            onClick={handleCloseModal}
          >
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-left">
                <img
                  src={Logo}
                  className="logo-icon w-[56px] mx-2 my-2 cursor-pointer"
                  alt="Logo"
                />
                <h3 className="font-cursive font-bold text-lg ml-1 mt-5">
                  WORK & WIN - Alert
                </h3>
              </div>
              <p className="py-4 text-left ml-10">{modalContent}</p>
              <div className="modal-action text-right">
                <button
                  className="btn btnAboutHoverEffect bg-[#0693c9] text-black rounded-md font-medium py-2 px-7 mr-4"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default GitFundamentalsContent;
