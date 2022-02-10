import React, { useState, useEffect } from "react";

const Main = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
  useEffect(() => {
    setQuestions(JSON.parse(localStorage.getItem("questions")));
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
        setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
    } else {
        setShowScore(true);
    }
};

  return (
    <div>
      {showScore ? (
        <div>
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div>
            <div>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div>
              {questions[currentQuestion]?.question}
            </div>
          </div>
          <div>
            {questions[currentQuestion]?.options.map((answerOption) => (
              <button
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
              >
                {answerOption.answer}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
