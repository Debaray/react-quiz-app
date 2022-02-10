import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
const AddQuestions = () => {
  const { id } = useParams();
  const history = useHistory();
  const initialState = {
    question: "",
    options: [
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: true },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ],
  };
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(initialState);

  useEffect(() => {
    setQuestions(JSON.parse(localStorage.getItem("questions")));
  }, []);

  useEffect(() => {
    if(id){
        setQuestion(questions.find(question =>question.id == id))
    }
  },[questions])

  const handleChange = (e) => {
    const newQuestion = { ...question };
    if (e.target.name === "question") {
      newQuestion[e.target.name] = e.target.value;
    } else if (e.target.name === "option") {
      newQuestion.options = newQuestion.options.map((option, index) => {
        return { ...option, isCorrect: index + 1 == e.target.value };
      });
    } else if (e.target.name === "answer1") {
      newQuestion.options[0].answer = e.target.value;
    } else if (e.target.name === "answer2") {
      newQuestion.options[1].answer = e.target.value;
    } else if (e.target.name === "answer3") {
      newQuestion.options[2].answer = e.target.value;
    } else if (e.target.name === "answer4") {
      newQuestion.options[3].answer = e.target.value;
    }
    setQuestion(newQuestion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(id){
        const newQuestions = [...questions]
        const index = questions.indexOf(questions.find(question => question.id == id))
        newQuestions[index] = question;
        localStorage.setItem("questions", JSON.stringify(newQuestions));
    }
    else{
        questions.push({ ...question, id: questions[questions.length - 1].id + 1 });
        localStorage.setItem("questions", JSON.stringify(questions));
    }
    history.push("/admin/manage_questions");
   
  };

  return (
    <div>
      <h1>{id ? "Edit Questions" : "Add Questions"}</h1>
      <form>
        <div className="mb-2">
          <label>Question</label>
          <input
            type="text"
            name="question"
            className="form-control"
            placeholder="Enter Question"
            onChange={handleChange}
            value={question?.question}
          />
        </div>
        <div className="d-flex align-items-baseline mb-2">
          <input
            type="radio"
            name="option"
            className="me-2"
            onChange={handleChange}
            value={1}
            checked={question?.options[0]?.isCorrect}
          />
          <input
            type="text"
            name="answer1"
            className="form-control"
            placeholder="Enter Answer 1"
            onChange={handleChange}
            value={question?.options[0]?.answer}
          />
        </div>
        <div className="d-flex align-items-baseline mb-2">
          <input
            type="radio"
            name="option"
            className="me-2"
            onChange={handleChange}
            value={2}
            defaultChecked
            checked={question?.options[1]?.isCorrect}
          />
          <input
            type="text"
            name="answer2"
            className="form-control"
            placeholder="Enter Answer 2"
            onChange={handleChange}
            value={question?.options[1]?.answer}
          />
        </div>
        <div className="d-flex align-items-baseline mb-2">
          <input
            type="radio"
            name="option"
            className="me-2"
            onChange={handleChange}
            value={3}
            checked={question?.options[2]?.isCorrect}
          />
          <input
            type="text"
            name="answer3"
            className="form-control"
            placeholder="Enter Answer 3"
            onChange={handleChange}
            value={question?.options[2]?.answer}
          />
        </div>
        <div className="d-flex align-items-baseline mb-2">
          <input
            type="radio"
            name="option"
            className="me-2"
            onChange={handleChange}
            value={4}
            checked={question?.options[3]?.isCorrect}
          />
          <input
            type="text"
            name="answer4"
            className="form-control"
            placeholder="Enter Answer 4"
            onChange={handleChange}
            value={question?.options[3]?.answer}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          {id? 'Update':'Save'}
        </button>
      </form>
    </div>
  );
};

export default AddQuestions;
