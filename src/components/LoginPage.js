import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataProvider";
import api from "../utils/AxiosConfig";

export const LoginPage = () => {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const {setUser} = useContext(DataContext);



  // 🔐 Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", { email, password });
      setMsg("Login successful!");
      localStorage.setItem("token", res.data.token);
      const usernameFromEmail = email.split("@")[0];
      setUser(prev => ({ ...prev, userName: usernameFromEmail,mail: email, }));
      console.log(res);
      navigate("/home");
    } catch (err) {
      setMsg("Login failed or email not verified.");
    }
  };

  // 📝 Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await api.post("/user/register", { email, password });
      console.log(res);
      setMsg(res.data); // Ex: "Verification email sent"
      setMode("login");
    } catch (err) {
      setMsg("Signup failed or email already exists.");
    }finally{
      setLoading(false);
    }
  };

  // 🔗 Google Login
  const handleGoogleResponse = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      const res = await api.post("/user/google-login", {
        email: decoded.email,
        name: decoded.name,
      });
      console.log(res);
      const loginPayload = JSON.parse(res.config.data);
      const email = loginPayload.email;
      const name = loginPayload.name;
      // ✅ Set user state
      setUser(prev => ({
        ...prev,
        userName: name || "Google User",
        mail: email
      }));
      localStorage.setItem("token", res.data.token);
      setMsg("Google login successful!");
      navigate("/home");
    } catch (err) {
      setMsg("Google login failed.");
    }
  };

  // 🧠 Google Button Init
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:process.env.REACT_APP_GOOGLE_CLIENT_ID , // Replace with actual
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>{mode === "login" ? "Login" : "Signup"}</h2>

      <form onSubmit={mode === "login" ? handleLogin : handleSignup}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />

        <button
          type="submit"
          style={{ width: "100%", padding: "0.75rem", background: "#007bff", color: "white", border: "none" }}
        >
          {mode === "login" ? "Login" : "Signup"}
        </button>
      </form>

      <div style={{ textAlign: "center", margin: "1rem 0" }}>or</div>

      {/* Google Login */}
      <div id="google-login-btn" style={{ display: "flex", justifyContent: "center" }}></div>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        {mode === "login" ? (
          <p>
            Don't have an account?{" "}
            <button onClick={() => setMode("signup")} style={{ background: "none", border: "none", color: "blue" }}>
              Signup
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button onClick={() => setMode("login")} style={{ background: "none", border: "none", color: "blue" }}>
              Login
            </button>
          </p>
        )}
      </div>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." style={{ width: "50px" }} />
        </div>
      ) : (
        msg && <p style={{ marginTop: "1rem", color: "red", textAlign: "center" }}>{msg}</p>
      )}
    </div>
  );
}
