import { useEffect, useState, useContext } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import DataContext from "../context/DataProvider";
import "../PageStyles/Response.css";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import api from "../utils/AxiosConfig";

export const Response = () => {
  const { responseData } = useContext(DataContext);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(false);

  const handlePracticeClick = async (e) => {
    e.preventDefault();
    setIsFetching(true);

    if (!question || !userAnswer) {
      alert("Please enter both a question and an answer.");
      setIsFetching(false);
      return;
    }

    try {
      const response = await api.post('/api/questions/improve', {
        question,
        userAnswer,
      });
      console.log(response.data);
      if (response.data && response.data.answer) {
        setCorrectAnswer(response.data.answer);
      } else {
        alert("Model did not return a valid response.");
      }
    } catch (err) {
      alert("Failed to get improved answer.");
    } finally {
      setIsFetching(false);
    }
  };


  useEffect(() => {
    if (Array.isArray(responseData) && responseData.length > 0) {
      setContent(responseData.join("\n\n"));
    } else {
      setContent("No response received.");
    }
    setLoading(false);
  }, [responseData]);


  return (
    <div className="responsePage">
      <Header />
      <div className="response-container">
        <h1>Interview Questions</h1>
        {loading ? (
          <p>Loading...</p>
        ) : responseData && responseData.length > 0 ? (
          <div className="markdown-list">
            {responseData.map((q, idx) => (
              // <div key={idx} className="question-item" style={{ display: 'flex', alignItems: 'center' }}>
              //   <span className="question-number" style={{ marginRight: '8px' }}>
              //     {idx + 1}.
              //   </span>
              //   <ReactMarkdown components={{ p: 'span' }}>{q}</ReactMarkdown>
              // </div>
              <div key={idx} className="question-item">
                <ReactMarkdown>{`**${idx + 1}.** ${q}`}</ReactMarkdown>
              </div>
            ))}
          </div>
        ) : (
          <p>No questions available.</p>
        )}
      </div>

      <div className="practice-form">
        <h2>Practice Your Answers</h2>
        <form onSubmit={handlePracticeClick} className="practiceForm">
          <label htmlFor="questionInput">Paste a Question:</label>
          <textarea
            id="questionInput"
            className="practice-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="3"
            placeholder="Copy & Paste your question here..."
          ></textarea>

          <label htmlFor="userAnswer">Your Answer (max 256 chars):</label>
          <textarea
            id="userAnswer"
            className="practice-input"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            rows="5"
            maxLength={500}
            placeholder="Write your answer..."
          ></textarea>

          {isFetching ? (
            <p style={{ color: "#000000ff", fontWeight: "bold" }}>
              <img
                src="https://i.gifer.com/ZZ5H.gif"
                alt="Loading"
                width="40"
              />
              <br />
              Processing... Please wait
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button className="btn-practice" type="submit">
                Practice
              </button>
              {correctAnswer && (
                <button
                  type="button"
                  className="btn-clear"
                  onClick={() => {
                    setQuestion("");
                    setUserAnswer("");
                    setCorrectAnswer("");
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </form>

        <label htmlFor="correctedAnswer">Corrected Answer:</label>
        <div id="correctedAnswer" className="corrected-box">
          {correctAnswer}
        </div>
      </div>

      <button
        className="btn-feedback"
        onClick={() => {
          navigate("/feedbacks");
        }}
      >
        Share your commands
      </button>
      <br />
      <br />
      <Footer />
    </div>
  );
};
