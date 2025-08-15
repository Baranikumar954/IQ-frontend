// import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Outlet, useNavigate} from 'react-router-dom';
import api from '../utils/AxiosConfig';
import { useContext, useEffect,useState } from 'react';
import '../PageStyles/Home.css';
import DataContext from '../context/DataProvider';

export const Home = () => {
  
  const {setProfile}=useContext(DataContext);

  const navigate = useNavigate();
   
    useEffect(()=>{
        const fetchUserProfileInfo = async()=>{
            try{
                const response = await api.get('/user/profile',{
                    withCredentials: true
                })
                console.log(response.data);
                setProfile(response.data);
            }catch(err){
                console.error("Error getting profile :", err);
                alert("Update your profile details on profile page.");
            }
        }
        fetchUserProfileInfo();
    },[])
  return (
    <div>
      <Header />
      
      <div className="homePage">
        <div className='homeContainer'>
          <h1 style={{ margin: '0px' }}>Welcome to IntelliQuest 🚀</h1>
          <h2>Your Personalized Interview Preparation Assistant</h2>
          <h3>🎯 Ace Your Next Interview with Confidence!</h3>
          <p style={{padding:'20px',paddingLeft:'40px',paddingRight:'40px'}}>Are you preparing for your dream job? IntelliQuest is here to make your journey smoother and smarter! We analyze your resume, role, experience level, and company selection to generate tailored interview questions—helping you practice with precision and focus.</p>
          
          <h2>Why Choose IntelliQuest?</h2>
          <ul>
            <li style={{display:'flexStart'}}>✅ Personalized Question Bank :Get interview questions tailored to your experience and job role.</li>
            <li style={{display:'flexStart'}}>✅ Company-Specific Insights : Select a company to receive relevant questions matching their hiring trends.</li>
            <li style={{display:'flexStart'}}>✅ Resume-Based Analysis : No company selected? No worries! Our AI detects key skills and prepares the best questions for you.</li>
            <li style={{display:'flexStart'}}>✅ Stay Ahead in Your Preparation : Improve your confidence and get interview-ready with structured practice.</li>
          </ul>
          <br /><br />
          <section className="how-it-works">
            <h2>🔍 How It Works?</h2>
            <div className="steps-container">
              <div className="step">
                <img src="https://img.icons8.com/external-vectorslab-flat-vectorslab/100/external-File-Upload-files-and-folders-vectorslab-flat-vectorslab.png" alt="upload resume" />
                <p><strong>Upload your Resume</strong></p>
                <p className="desc">AI will generate interview questions using your resume and experience as key references.</p>
              </div>
              <div className="step">
                <img src="https://img.icons8.com/stickers/100/choose.png" alt="choose role" />
                <p><strong>Choose Role & Experience</strong></p>
                <p className="desc">Select your preferred role and experience level to tailor the question complexity.</p>
              </div>
              <div className="step">
                <img src="https://img.icons8.com/bubbles/100/company.png" alt="select company" />
                <p><strong>Select a Company</strong></p>
                <p className="desc">(Optional) Pick a company to align questions with their expectations.</p>
              </div>
              <div className="step">
                <img src="https://img.icons8.com/stickers/100/test-results.png" alt="get questions" />
                <p><strong>Get Tailored Questions</strong></p>
                <p className="desc">Receive smart interview questions along with sample answers and strategies.</p>
              </div>
            </div>
          </section>
<br /><br />
          <h4>💡 Prepare Smarter. Perform Better. Land Your Dream Job.</h4>
          
        </div>
      
        <h3>🚀 Start Your Journey with IntelliQuest Today!</h3>
        <button 
            onClick={() => {
              navigate('/question');
            }}
          >
          Start your preparation
          </button>
        
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
