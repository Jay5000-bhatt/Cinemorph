import React, { useState, useEffect } from "react";
import "./ToastNotification.css";

const ToastNotification = () => {
  const [online, setOnline] = useState(true);
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const checkOnlineStatus = () => {
      const isOnline = window.navigator.onLine;
      setOnline(isOnline);
      if (!isOnline) {
        setShowToast(true); // Show the offline toast immediately if offline
        localStorage.setItem("showToast", "true"); // Store the offline status
      } else {
        // Show the online toast only if there's no stored offline status
        if (!localStorage.getItem("showToast")) {
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 3000); // Show online toaster for 3 seconds
        }
      }
    };

    const hideToastAfterTimeout = () => {
      if (showToast && online) {
        setTimeout(() => {
          setShowToast(false);
        }, 1000); // Hide online toaster after 3 seconds
      }
    };

    window.addEventListener("online", checkOnlineStatus);
    window.addEventListener("offline", checkOnlineStatus);
    hideToastAfterTimeout();

    return () => {
      window.removeEventListener("online", checkOnlineStatus);
      window.removeEventListener("offline", checkOnlineStatus);
    };
  }, [showToast, online]);

  return (
    <div className={`wrapper ${showToast ? "" : "hide"}`}>
      <div className={`toast ${online ? "" : "offline"}`}>
        <div className="content">
          <div className="icon">
            <i className={`uil ${online ? "uil-wifi" : "uil-wifi-slash"}`}></i>
          </div>
          <div className="details">
            <span>{online ? "You're online now" : "You're offline now"}</span>
            <p>
              {online
                ? "Hurray! Internet is connected."
                : "Opps! Internet is disconnected."}
            </p>
          </div>
        </div>
        <div className="close-icon" onClick={() => setShowToast(false)}>
          <i className="uil uil-times"></i>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
