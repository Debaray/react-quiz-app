import React from 'react';

const SingleQuestion = (props) => {
    const { questions, question, setReload,index} = props;

    const handleDelete = question_id =>{
        const newQuestions = questions.filter((question,index) =>question.id !== question_id);
        console.log(newQuestions)
        localStorage.setItem('questions', JSON.stringify(newQuestions));
        setReload(true);
    }
    return (
        <div className="col-4">
            <div className="shadow p-3 mb-5 bg-white rounded text-black">
                <h6>{question.question}</h6>
                {
                    question.options.map((option, i) => {
                        return(
                            <h6>{i+1} .{option.answer} {option.isCorrect? '(correct answer)' :''}</h6>
                        )
                    })
                }
                <div className="d-flex">
                    <button className="btn btn-warning m-2">Edit</button>
                    <button className="btn btn-danger m-2" onClick={()=>handleDelete(question.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default SingleQuestion;