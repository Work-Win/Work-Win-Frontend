import React, { useState } from "react";

const QuizComponent = ({ onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const questions = [
    {
      id: 1,
      question: "1. What is Git?",
      options: [
        " A programming language",
        " A version control system",
        " A text editor",
        " A compiler",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question:
        "2. Which command is used to check the current status of the repository?",
      options: [" git init", " git status", " git commit", " git log"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "3. How do you create a new branch in Git?",
      options: [
        " git create-branch [branch-name]",
        " git checkout [branch-name]",
        " git branch [branch-name]",
        " git new [branch-name]",
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      question:
        "4. Which command is used to send changes to a remote repository?",
      options: [" git pull", " git fetch", " git push", " git clone"],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "5.What does git clone do?",
      options: [
        " Creates a copy of a remote repository locally",
        " Deletes a remote repository",
        " Merges branches",
        " Adds changes to the staging area",
      ],
      correctAnswer: 0,
    },
  ];

  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    const percentage = (score / questions.length) * 100;
    onSubmit(percentage);
  };

  return (
    <div className="quiz-container">
      {questions.map((q) => (
        <div key={q.id} className="question-section">
          <h3 className="font-bold">{q.question}</h3>
          <ul className="options-list mb-3">
            {q.options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={index}
                    onChange={() => handleAnswerChange(q.id, index)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button className="submit-button" onClick={handleSubmit}>
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizComponent;
