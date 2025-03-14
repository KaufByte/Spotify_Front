import React, { useState } from "react";
import "firebase/compat/auth";
import firebase, { googleProvider, facebookProvider } from "../provider/firebase";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "https://spotify-update.onrender.com/api/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
        const response = await fetch(`${API_URL}users/login/`, {  // Динамический URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: login, password })
        });

        const data = await response.json();
        console.log("Ответ API:", data);

        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }

        localStorage.setItem("userEmail", data.email);
        navigate("/main-page1");

    } catch (error) {
        console.error("Login error:", error);
        setErrorMessage("Invalid email or password.");
    } finally {
        setIsLoading(false);
    }
  };


  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await firebase.auth().signInWithPopup(googleProvider);
      if (result.user) {
        localStorage.setItem("userEmail", result.user.email || "");
        localStorage.setItem("username", result.user.displayName || "Google User");
        navigate("/main-page1");
      } else {
        setErrorMessage("User not found. Please try again.");
      }
    } catch (error) {
      console.error("Error with Google sign in:", error);
      setErrorMessage("Error with Google sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    setIsLoading(true);
    try {
      const result = await firebase.auth().signInWithPopup(facebookProvider);
      if (result.user) {
        localStorage.setItem("userEmail", result.user.email || "");
        localStorage.setItem("username", result.user.displayName || "Facebook User");
        navigate("/main-page1");
      } else {
        setErrorMessage("User not found. Please try again.");
      }
    } catch (error) {
      console.error("Error with Facebook sign in:", error);
      setErrorMessage("Error with Facebook sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png" alt="Spotify Logo" />
      <h1 className="login-title">Log in to Spotify</h1>
      <div className="auth-buttons">
        <button className="btn-google" onClick={signInWithGoogle} disabled={isLoading}>
          <FcGoogle style={{ marginRight: '8px' }} className="google-icon"/> Continue with Google
        </button>
        <button className="btn-facebook" onClick={signInWithFacebook} disabled={isLoading}>
          <FaFacebook style={{ marginRight: '8px' }} className="facebook-icon" />
          Continue with Facebook        
        </button>
      </div>
      <div className="thin-divider2"></div>
      <form onSubmit={handleSubmit}>
        <div className="input-group2">
          <input
            type="text"
            placeholder="Email or Username"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="input-group2">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="btn-login" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <div className="signup-link">
        Don’t have an account? <Link to="/signup">Sign up for Spotify</Link>
      </div>
    </div>
  );
};

export default Login;
