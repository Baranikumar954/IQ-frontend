import React, { useContext, useRef, useState } from "react";
import '../PageStyles/Contact.css';
import api from "../utils/AxiosConfig";
import { toast } from "react-hot-toast";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import DataContext from "../context/DataProvider";

export const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const {user}= useContext(DataContext);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      from_name: form.current.from_name.value,
      reply_to: user.mail,
      message: form.current.message.value,
    };

    try {
      const response = await api.post("/user/contact", formData);
      console.log(response);
      console.log(user.mail)
      toast.success(response.data.message || "🎉 Your message has been sent successfully!", {
        style: {
          borderRadius: "10px",
          background: "#1e293b",
          color: "#fff",
          padding: "16px",
        },
        icon: "📨",
      });

      form.current.reset();
    } catch (error) {
      toast.error("❌ Something went wrong. Try again later.", {
        style: {
          borderRadius: "10px",
          background: "#dc2626",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contactPage">
      <Header/>
      <div className="contact-container">
        <div className="contact-box">
          <h1>📞 Contact Us</h1>

          <p><strong>We'd Love to Hear From You!</strong><br />
            We're a passionate team of students who created <strong>IntelliQuest</strong>...
          </p>

          <p>
            Whether you're a user looking for help or an HR professional curious to explore our platform — feel free to reach out!
          </p>

          <p>
            🧑‍💻 <strong>Built With Passion</strong><br />
            IntelliQuest is developed by a group of final-year Computer Science and Business Systems students...
          </p>

          <p>
            📬 <strong>Reach Out</strong><br />
            For any queries, suggestions, or support, you can contact us at:<br />
            📧 <a href="mailto:baranikumar952004@gmail.com">baranikumar952004@gmail.com</a><br />
            📧 <a href="mailto:dvishwa764@gmail.com">dvishwa764@gmail.com</a><br />
            📧 <a href="mailto:baranikumar952004@gmail.com">baranikumar952004@gmail.com</a><br />
            📧 <a href="mailto:kathirkathir7082@gmail.com">kathirkathir7082@gmail.com</a>
          </p>

          <p>
            🤝 <strong>Want to Connect?</strong><br />
            Whether you're a fellow student, a recruiter, or someone just curious — we’d love to hear your feedback or ideas.
          </p>

          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <input type="text" name="from_name" placeholder="Your Name" required />
            <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
