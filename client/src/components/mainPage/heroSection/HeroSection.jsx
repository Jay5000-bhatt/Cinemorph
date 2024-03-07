import React from "react";
import "./HeroSection.css";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, firebaseDatabase } from "../../../utils/firebase-config";
import { getDatabase, ref, set } from 'firebase/database';
import mainlogo from "../../../assets/logo.svg";

function HeroSection(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "", name: ""});
  
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { email, password, name } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);

      // After successful signup, store name and email in Firebase Realtime Database
      const userId = firebaseAuth.currentUser.uid;
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`);

      // Set user data in the database
      await set(userRef, {
        email,
        Name: name,
        login_time: Date.now()
      });

      // Redirect to Home page after signup
      navigate("/Home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/Home");
  });
  return (
    <>
      <div className="main">
        <nav>
          <span className="logo">
            <img width={53} src={mainlogo} alt="" />
          </span>
          <div className="nav-btn">
            <button className="btn btn-remove">English</button>
            <button className="btn btn-red-sm" onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
        </nav>
        <div className="box"></div>
        <div className="hero">
          <span>
            The biggest Indian hits. The best Indian stories. All streaming
            here.
          </span>
          <span>Watch anywhere. Cancel anytime.</span>
          <span>
            Ready to watch? Enter your email to create or restart your
            membership.
          </span>

          <div className="hero-buttons">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <>
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="name"
                value={formValues.name}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            </>
            )}
            {!showPassword && (
              <button
                className="btn btn-red"
                onClick={() => setShowPassword(true)}
              >
                Get Started &gt;
              </button>
            )}
          </div>
          {showPassword && (
            <button className="btn btn-red" onClick={handleSignIn}>
              Sign Up
            </button>
          )}
        </div>
      </div>
      <div className="separation"></div>
    </>
  );
}

export default HeroSection;
