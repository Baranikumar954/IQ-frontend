import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import DataContext from "../context/DataProvider";
import api from "../utils/AxiosConfig";
import '../PageStyles/Analyser.css';

export const Analyser = () => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [fileError, setFileError] = useState("");
    const [resumeFile, setResumeFile] = useState(null);

    const { setResumeText, setAnalyseResponseData } = useContext(DataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        if (fileError || !resumeFile) {
            alert("Please fix the file format issue before submitting.");
            setIsProcessing(false);
            return;
        }

        try {
            setIsProcessing(true);
            // Step 1: Upload resume and get extracted text
            const formData = new FormData();
            formData.append("file", resumeFile);
            const textRes = await api.post("/api/extract-text", formData, {
                headers: {
    "Content-Type": "multipart/form-data",
  }
            });

            const extractedText = textRes.data?.text;
            if (!extractedText) {
                alert("Failed to extract text. Please try again.");
                setIsProcessing(false);
                return;
            }

            setResumeText(extractedText);

            // Step 2: Generate suggestions using the extracted text
            const suggestionsRes = await api.post("/api/generate-suggestions", {
                text: extractedText
            });
            console.log(suggestionsRes);
            const suggestions = suggestionsRes.data;
            if (suggestions) {
                setAnalyseResponseData(suggestions);
                navigate('/analyserResponse', { state: { analyseResponseData: suggestions } });
            } else {
                alert("Failed to fetch data. Please try again.");
            }

        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFileCheck = (e) => {
        const file = e.target.files[0];
        setResumeFile(file);

        if (!file) {
            setFileError("No file selected");
            return;
        }

        const fileSize = file.size / (1024 * 1024);
        const isPDF = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

        if (isPDF && fileSize < 5) {
            setTimeout(() => setFileError(""), 500);
        } else {
            setFileError("File must be a PDF and less than 5MB.");
        }
    };

    return (
        <div className='analyserPage'>
            <Header />
            <div className='analyse-section'>
                <form onSubmit={handleSubmit} className="getResume">
                    <label htmlFor="resumeInput">Upload Your Resume</label>
                    <input type="file" name="resumeInput" id="resumeInput" onChange={handleFileCheck} required />
                    <p>File must be less than 5MB</p>
                    {fileError && <p style={{ color: 'red' }} className="errorMessage">{fileError}</p>}
                    <br /><br />
                    {isProcessing ? (
                    <p style={{ color: "#000000ff", fontWeight: "bold" }}>
                        <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading" width="40" /> <br />Processing... Please wait
                    </p>
                    ) : (
                        <button type='submit' id='analyseBtn' style={{ backgroundColor: '#00FFD1' }}>Analyse Resume</button>
                    )}
                </form>
            </div>
            <Footer />
        </div>
    );
};
