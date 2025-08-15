import React, { useContext,useEffect,useState } from 'react'
import DataContext from '../context/DataProvider'
import '../PageStyles/Profile.css'
import MaleProfile from '../media/MaleProfile.png';
import FemaleProfile from '../media/FemaleProfile.png';
import { EditProfile } from './EditProfile';
import api from '../utils/AxiosConfig';

export const Profile = () => {
    const {profile} = useContext(DataContext)
    
    const [showEditModal, setShowEditModal] = useState(false);
    const [quote,setQuote] = useState({quote:"",author:""})

    useEffect(() => {

  // Quote logic
  const today = new Date().toISOString().split("T")[0];
  const storedQuote = JSON.parse(localStorage.getItem("todayQuote"));

  if (!storedQuote || storedQuote.date !== today) {
    fetchTodayQuote().then((newQuote) => {
      const quoteData = { ...newQuote, date: today };
      localStorage.setItem("todayQuote", JSON.stringify(quoteData));
      setQuote(quoteData);
    });
  } else {
    setQuote(storedQuote);
  }
}, []); // runs once

const fetchTodayQuote = async () => {
  try {
    const response = await api.get("/api/quotes/random", { withCredentials: true });
    if (response.status === 200) {
      return { quote: response.data.quoteText, author: response.data.quoteAuthor };
    }
  } catch (err) {
    console.error(err);
  }
  return { quote: "Stay Motivated!", author: "IntelliQuest" };
};


    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleClose = () => {
        setShowEditModal(false);
    };

  return (
    <>
        <div className={`profileContainer ${showEditModal ? 'blurred' : ''}`}>
            <div className='leftSideContainer'>
                <div className="leftTopProfile">
                    <div className='leftTopContent'>
                        <img
                            src={
                                profile.gender === "Male"
                                ? MaleProfile
                                : profile.gender === "Female"
                                ? FemaleProfile
                                : "https://img.icons8.com/ios-filled/80/user.png" // default image
                            }
                            width={60}
                            height={60}
                            alt="Profile"
                            id="profile-picture"
                        />
                        <br />
                        <p id="HeadingName">Hi ,{profile.fullName +" "+profile.sureName}</p>
                        <p id='HeadingName'>{profile.aim}</p><br />
                        <p id='HeadingMail'>{profile.email}</p>
                    </div>
                    <div className='leftBottomContent'>
                        <div className='lbc1'>
                            <img src="https://img.icons8.com/badges/25/create.png" alt="timestamp" />
                            <p>Created At : {
                                new Date(profile.createdAt).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                }).replace(',', '')
                                .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
                                .toLowerCase()
                            }</p>
                        </div>
                        <div className='lbc2'>
                            <img src="https://img.icons8.com/material-outlined/24/activity-feed.png" alt="recentActivity" />
                            <p>Recent Activity : {}</p>
                        </div>
                        <div className='lbc3' onClick={handleEditClick}>
                            <img src="https://img.icons8.com/ios-glyphs/25/edit-user-male.png" alt="editProfile" />
                            <p>Edit Profile</p>
                        </div>
                        <div className='lbc4'>
                            <img src="https://img.icons8.com/ios-glyphs/25/fire-element.png" alt="strike" />
                            <p>Strike : {profile.strike}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='rightSideContainer'>
                <div className='bioGraph'>
                    <h2>Bio Graph</h2>

                    <span className="label">Full name :</span>
                    <span>{profile.fullName + " " + profile.sureName}</span>

                    <span className="label">Aim :</span>
                    <span>{profile.aim}</span>

                    <span className="label">Email Id :</span>
                    <span>{profile.email}</span>

                    <span className="label">Phone Number :</span>
                    <span>{profile.mobileNumber}</span>

                    <span className="label">Education :</span>
                    <span>{profile.education}</span>

                    <span className="label">College Name :</span>
                    <span>{profile.collegeName}</span>

                    <span className="label">DOB :</span>
                    <span>{profile.dob}</span>
                </div>

                <div className='todayQuotes'>
                    <p>{quote.quote} - <span>{quote.author}</span></p>
                </div>
            </div>
        </div>
        {showEditModal && (
        <EditProfile onClose={handleClose} />
        )}
    </>
  )
}
