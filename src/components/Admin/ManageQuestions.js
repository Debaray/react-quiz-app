import React, { useState, useEffect } from "react";
import SingleQuestion from "./SingleQuestion";
const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setQuestions(JSON.parse(localStorage.getItem("questions")));
    setReload(false);
  }, [reload]);
  return (
    <div className="row m-2">
      {questions.map((question, index) => (
        <SingleQuestion
          questions={questions}
          question={question}
          setReload={setReload}
          index={index}
        ></SingleQuestion>
      ))}
    </div>
  );
};

export default ManageQuestions;
