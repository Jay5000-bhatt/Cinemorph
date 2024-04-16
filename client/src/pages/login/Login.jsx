import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase-config";
import mainlogo from "../../assets/logo.svg";
import eyeclose from "../../assets/eye-close.svg";
import eyeopen from "../../assets/eye-open.svg";
import ToasterNotification from "../../components/ToasterNotification/ToastNotification"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.code);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/Home");
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    
    <div className="sign-in-page">
      <ToasterNotification />
      <nav>
        <a href="/">
          <img src={mainlogo} alt="logo" />
        </a>
      </nav>
      <div className="form-wrapper">
        <h2>Sign In</h2>
        <div className="form">
          <div className="form-control">
            <input
              type="text"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-control">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <img
              src={showPassword ? eyeopen : eyeclose}
              alt="Toggle Password"
              className="icon-change"
              id="icon-change"
              onClick={togglePasswordVisibility}
            />
          </div>
          <button onClick={handleLogin}>Sign In</button>
          <div className="form-help">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="https://cinemorph.vercel.app/">Need help?</a>
          </div>
        </div>
        <p>
          New to Cinemorph? <a href="https://cinemorph.vercel.app/">Sign up now</a>
        </p>
        <small>
          This page is protected by Google reCAPTCHA to ensure you're not a
          bot.&nbsp;&nbsp;
          <a href="https://cinemorph.vercel.app/">Learn more.</a>
        </small>
      </div>
    </div>
  );
}

export default Login;
