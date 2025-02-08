import React from "react";

function QuestionItem({ question, setQuestions, questions }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setQuestions(questions.filter((q) => q.id !== id));
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  function handleCorrectAnswerChange(event) {
    const newCorrectIndex = parseInt(event.target.value);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        setQuestions(questions.map((q) => (q.id === id ? updatedQuestion : q)));
      })
      .catch((error) => console.error("Error updating question:", error));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectAnswerChange}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>{answer}</option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
