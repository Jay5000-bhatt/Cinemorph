// components/Footer.js
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="questions">Questions? Call +91 8769297221</div>
      <div className="footer">
        <ul className="footer-item grid-link">
          <li>
            <a href="https://reactnative.dev/">FAQ</a>
          </li>
          <li>
            <a href="https://reactnative.dev/">Help Centre</a>
          </li>
          <li>
            <a href="https://reactnative.dev/">Account</a>
          </li>
          <li>
            <a href="https://reactnative.dev/">Media Centre</a>
          </li>
          <li>
            <a href="https://reactnative.dev/">Investor Relations</a>
          </li>
          <li>
            <a href="https://reactnative.dev/">Jobs</a>
          </li>
          <li>
            <a href="https://reactnative.dev/">Ways to Watch</a>
          </li>
          <li>
            <a href="https://reactnative.dev/">Terms of Use</a>
          </li>
          <li>
            <a href="https://reactnative.dev/">Privacy</a>
          </li>
          <li>
            <a href="https://reactnative.dev/">Cookie Preferences</a>
          </li>
          <li>
            <a href="https://reactnative.dev/">Corporate Information</a>
          </li>
          <li>
            <a href="https://reactnative.dev/">Contact Us</a>
          </li>
          <li>
            <a href="https://reactnative.dev/">Speed Test</a>
          </li>
          <li>
            <a href="https://reactnative.dev/">Legal Notices</a>
          </li>
          <li>
            <a href="https://reactnative.dev/">Only on Netflix</a>{" "}
          </li>
        </ul>
      </div>
      <div className="credit">
        &#169; created by <span>Mr. Jay Bhatt</span> | all rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
