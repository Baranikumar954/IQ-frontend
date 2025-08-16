import { useState, useContext, useEffect } from "react";
import DataContext from "../context/DataProvider";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import '../PageStyles/AnalyseResponse.css';
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export const AnalyseResponse = () => {
  const { analyseResponseData } = useContext(DataContext);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [animatedScore, setAnimatedScore] = useState(0);
  const navigate = useNavigate();

useEffect(() => {
  if (analyseResponseData) {
    try {
      // Since the response is already a valid JSON object
      setReport(analyseResponseData);
      setError("");
    } catch (err) {
      console.error("Failed to set report:", err);
      setError("Something went wrong while setting the report");
    }
  }
}, [analyseResponseData]);


  useEffect(() => {
    if (report?.ats_score) {
      let start = 0;
      const end = report.ats_score;
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / end));

      const timer = setInterval(() => {
        start += 1;
        setAnimatedScore(start);
        if (start === end) clearInterval(timer);
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [report?.ats_score]);


  return (
    <div className="AnalyseResponsePage">
      <Header />
      <div className="AnalyseResponsePage-content" style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
        <h2>Analysed Report</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {report ? (
          <>
            <p><strong>ATS Score:</strong> <span className="ats-score">{animatedScore} / 100</span></p>
            <br />
            <h3>Strengths</h3>
            <ul>
              {report.strengths?.map((item, idx) => (
                <li key={idx}><ReactMarkdown>{item}</ReactMarkdown></li>
              ))}
            </ul>
            <br />
            <h3>Weaknesses</h3>
            <ul>
              {report.weaknesses?.map((item, idx) => (
                <li key={idx}><ReactMarkdown>{item}</ReactMarkdown></li>
              ))}
            </ul>
              <br />
            <h3>Suggestions</h3>
            <ol>
              {report.suggestions?.map((item, idx) => (
                <li key={idx}><ReactMarkdown>{item}</ReactMarkdown></li>
              ))}
            </ol>
            <br />
            <br />
            <button
              className="btn-feedback"
              onClick={() => {
                navigate("/feedbacks");
              }}
            >
              Share your commands
            </button>
          </>
          
        ) : (
          <p>Loading report...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};
