import React, { useContext ,useState,useEffect} from 'react'
import DataContext from '../context/DataProvider';
import api from '../utils/AxiosConfig';
import '../PageStyles/EditProfile.css'

export const EditProfile = ({onClose}) => {
    const {profile,setProfile} = useContext(DataContext);
    const [formData, setFormData] = useState({});
    useEffect(() => {
      setFormData({
        fullName: profile.fullName || "",
        sureName: profile.sureName || "",
        mobileNumber: profile.mobileNumber || "",
        gender: profile.gender || "",
        education: profile.education || "",
        collegeName: profile.collegeName || "",
        aim: profile.aim || "",
        dob: profile.dob || "",
      });
    }, [profile]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleGenderChange = (e) => {
      setFormData(prev => ({
        ...prev,
        gender: e.target.value
      }));
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
          const response =await api.put(`/user/edit/profile/${profile.id}`, formData);
          setProfile(response.data); // Update global profile
          alert("Profile updated successfully!");
          onClose(); // Close modal
        }catch(err){
            console.log(err)
            alert("Changes failed to update...");
        }
    }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button id="close-button" onClick={onClose}>&times;</button>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit} method="post">
          <label htmlFor="fullName">Fullname</label>
          <input type="text" name='fullName' value={formData.fullName} onChange={handleChange} required />

          <label htmlFor="sureName">Surname</label>
          <input type="text" name="sureName" value={formData.sureName} onChange={handleChange} required />

          <label htmlFor="mobileNumber">Phone Number</label>
          <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />

          <div>
            <label><strong>Gender:</strong></label><br />
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleGenderChange}
            />
            <label htmlFor="male">Male</label><br />
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleGenderChange}
            />
            <label htmlFor="female">Female</label>
          </div>

          <label htmlFor="education">Education</label>
          <input type="text" name="education" value={formData.education} onChange={handleChange} required />

          <label htmlFor="collegeName">College Name</label>
          <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} required />

          <label htmlFor="aim">Aim</label>
          <input type="text" name="aim" value={formData.aim} onChange={handleChange} required />

          <label htmlFor="dob">D.O.B</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

          <button type='submit' id='saveButton'>Save</button>
        </form>
      </div>
    </div>
  )
}
