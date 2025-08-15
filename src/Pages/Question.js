import React, { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import DataContext from '../context/DataProvider';
import '../PageStyles/Question.css';
import api from '../utils/AxiosConfig';

export const Question = () => {
  const {
    setResponseData, cmpny, setCmpny, qnType, setQnType,
    roleName, setRoleName, experience, setExperience, setResumeText
  } = useContext(DataContext);

  const [resumeFile, setResumeFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (fileError || !resumeFile) {
      alert("Please fix the file format issue before submitting.");
      setIsProcessing(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("companyName", cmpny);
      formData.append("roleName", roleName);
      formData.append("questionType", qnType);
      formData.append("experience", experience);
      console.log(formData)
      console.log(cmpny+roleName+qnType+experience)
      // ✅ Call Spring Boot backend to generate questions
      const res = await api.post('/api/questions/generate', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(res.data);
      const { questions, resumeText } = res.data;

      if (!questions || !Array.isArray(questions)) throw new Error("No questions received.");

      setResumeText(resumeText);
      setResponseData(questions);
      console.log(questions)
      setCmpny("");
      setRoleName("");
      setQnType("");
      setExperience("");
      setResumeText("");
      setResumeFile(null);
      navigate('/response');

    } catch (err) {
      console.error("Error generating questions:", err);
      alert("Something went wrong while generating questions.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='QuestionPage'>
      <Header />
      <form onSubmit={handleSubmit} className='getResume'>
        <label htmlFor="resumeInput">
          <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="Upload" className="form-icon" />
          Upload Your Resume
        </label>
        <input type="file" name="resumeInput" id="resumeInput" onChange={handleFileCheck} required />
        <p>File must be less than 5MB</p>
        {fileError && <p style={{ color: 'red' }} className='errorMessage'>{fileError}</p>}

        <br /><br />

        <label htmlFor='companiesPreDef'>
          <img src="https://cdn-icons-png.flaticon.com/512/2920/2920315.png" alt="Company" className="form-icon" />
          Select predefined companies
        </label>
        <select value={cmpny} onChange={(e) => setCmpny(e.target.value)} required>
           <option value="" disabled>Select company</option>
          <option value="zoho">Zoho</option>
          <option value="Amazon">Amazon</option>
          <option value="Facebook">Facebook</option>
          <option value="Google">Google</option>
          <option value="TCS">TCS</option>
          <option value="Accenture">Accenture</option>
          <option value="Unknown">Others</option>
        </select>
        <p>Temporary not available this service</p>

        <br /><br />

        <label htmlFor="jobRole">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Role" className="form-icon" />
          Select Job Role
        </label>
        <select value={roleName} onChange={(e) => setRoleName(e.target.value)} required>
           <option value="" disabled>Select Role</option>
          <option value="Software Developer">Software Developer</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Data Scientist">Data Scientist</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="Software Testing">Software Testing</option>
          <option value="Dev Ops">Dev Ops</option>
          <option value="other">others</option>
        </select>

        <br /><br />

        <label htmlFor="questionType">
          <img src="https://cdn-icons-png.flaticon.com/512/2659/2659980.png" alt="Question Type" className="form-icon" />
          Select Question Type
        </label>
        <select value={qnType} onChange={(e) => setQnType(e.target.value)} required>
           <option value="" disabled>Select Question type</option>
          <option value="Non-Technical">Non-Technical</option>
          <option value="Technical">Technical</option>
          <option value="Both">Both</option>
        </select>

        <br /><br />

        <label htmlFor="ExpOrFresh">
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png" alt="Experience" className="form-icon" />
          Select Your Experience
        </label>
        <select value={experience} onChange={(e) => setExperience(e.target.value)} required>
           <option value="" disabled>Select experience level</option>
          <option value="Freshers">Fresher</option>
          <option value="1 to 5 years Experience"> 1 to 5</option>
          <option value="5+ years Experience"> 5+ years</option>
        </select>

        <br /><br />

        {isProcessing ? (
          <p style={{ color: "#000000ff", fontWeight: "bold" }}>
            <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading" width="40" />
            <br /> Processing... Please wait
          </p>
        ) : (
          <button type='submit'>Generate Question</button>
        )}
      </form>
      <Footer />
    </div>
  );
};
