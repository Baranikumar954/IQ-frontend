import React, { useContext, useEffect, useState } from 'react';
import '../PageStyles/Feedbacks.css';
import api from '../utils/AxiosConfig';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import DataContext from '../context/DataProvider';

export const Feedbacks = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const {profile,user}=useContext(DataContext);
  const fullName = [profile.fullName, profile.sureName].filter(Boolean).join(" ");
  const username = fullName || user.userName;
  const email = user.mail;


  const fetchFeedbacks = async () => {
    try {
      const res = await api.get('/api/feedbacks');
      setFeedbacks(res.data);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const res = await api.get('/api/feedbacks/average');
      setAvgRating(res.data.average || 0);
    } catch (err) {
      console.error('Error fetching average rating:', err);
    }
  };


  useEffect(() => {
    fetchFeedbacks();
    fetchAverageRating();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback || rating === 0) {
      alert('Please fill out all fields and select a rating.');
      return;
    }

    try {
      await api.post(
        '/api/feedbacks',
        {
          gmail_id: email,
          username,
          feedback,
          rating
        }
      );

      alert('Feedback submitted successfully!');
      setFeedback('');
      setRating(0);
      fetchFeedbacks();
      fetchAverageRating();
    } catch (err) {
      console.error('Error submitting feedback:', err);
      alert('Something went wrong while submitting feedback.');
    }
  };

  const handleLike = async (id) => {
    try {
      await api.put(`/api/feedbacks/${id}/like`);
      fetchFeedbacks();
    } catch (err) {
      console.error('Error liking feedback:', err);
    }
  };

  const handleDislike = async (id) => {
    try {
      await api.put(`/api/feedbacks/${id}/dislike`);
      fetchFeedbacks();
    } catch (err) {
      console.error('Error disliking feedback:', err);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="feedback-container">
        <div className="left-column">
          <div className="rating-summary">
            <h2>⭐ {avgRating.toFixed(1)} / 5</h2>
            <p>{feedbacks.length} Ratings</p>
          </div>

          <div className="add-review">
            <h3>Add a Review</h3>
            <form onSubmit={handleSubmit}>
              <div className="star-select">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= (hover || rating) ? 'filled-star' : 'empty-star'}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                placeholder="Write your review..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        <div className="recent-feedbacks-scrollable">
          <h3>Recent Feedbacks</h3>
          <div className="feedback-list">
            {feedbacks.map((fb, index) => (
              <div key={index} className="feedback-card-box">
                <div className="feedback-header">
                  <h4>{fb.name}</h4>
                  <span className="timestamp">{new Date(fb.postedAt).toLocaleDateString()}</span>
                </div>
                <div className="stars">
                  {'★'.repeat(fb.rating)}
                  {'☆'.repeat(5 - fb.rating)}
                </div>
                <p className="feedback-text">{fb.feedback}</p>
                <div className="feedback-actions">
                  <button onClick={() => handleLike(fb.id)}>👍 {fb.like || 0}</button>
                  <button onClick={() => handleDislike(fb.id)}>👎 {fb.dislike || 0}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
