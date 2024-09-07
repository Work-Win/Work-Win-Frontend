import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/content.css";
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import { Oval } from "react-loader-spinner";
import { Fragment } from "react";

const QnAModelContent = () => {
  const navigate = useNavigate();
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState();
  const [model, setModel] = useState(null);

  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log("Model loaded.");
  };

  useEffect(() => {
    loadModel();
  }, []);

  const answerQuestion = async () => {
    if (model !== null) {
      console.log("Question submitted.");
      const passage = passageRef.current.value;
      const question = questionRef.current.value;

      const answers = await model.findAnswers(question, passage);
      setAnswer(answers);
      console.log(answers);
    }
  };

  const dashboardNavigate = () => {
    navigate("/dashboard");
  };

  return (
    <div className="content-qna">
      <div className="content-header-qna">
        <h1 className="header-title-qna">
          <span onClick={dashboardNavigate} style={{ cursor: "pointer" }}>
            Dashboard
          </span>{" "}
          {">>"} Q & A Model
        </h1>
        <div>
          {model == null ? (
            <div className="loading-section">
              <div>Model Loading</div>
              <Oval type="Puff" color="#00BFFF" height={100} width={100} />
            </div>
          ) : (
            <Fragment>
              <div className="qna-section">
                <label htmlFor="passage" className="label">
                  Passage
                </label>
                <textarea
                  ref={passageRef}
                  id="passage"
                  rows="10"
                  cols="80"
                  className="textarea"
                ></textarea>

                <label htmlFor="question" className="label">
                  Ask a Question
                </label>
                <div className="input-box-container">
                  <input
                    ref={questionRef}
                    id="question"
                    className="input-box"
                    size="80"
                  ></input>
                  <button onClick={answerQuestion} className="ask-btn">
                    Ask
                  </button>
                </div>

                <div className="answers-section">
                  {answer
                    ? answer.map((ans, idx) => (
                        <div key={idx}>
                          <b>Answer {idx + 1} - </b> {ans.text} (
                          {Math.floor(ans.score * 100) / 100})
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default QnAModelContent;
