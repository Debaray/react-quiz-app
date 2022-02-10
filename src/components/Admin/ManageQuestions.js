import React, { useState, useEffect } from "react";
import SingleQuestion from "./SingleQuestion";
import { Link } from "react-router-dom";
const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setQuestions(JSON.parse(localStorage.getItem("questions")));
    setReload(false);
  }, [reload]);
  return (
    <div>
        <Link to={'/admin/add_questions'} className="btn btn-primary m-2 ms-3">Add new Question</Link>
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
    </div>
  );
};

export default ManageQuestions;
