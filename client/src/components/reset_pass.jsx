import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Resetpass = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();



  const prevEmail = location.state?.email || "";
  useState(() => {
    setEmail(prevEmail);
  }, [prevEmail]);

  const handlereset = async () => {
    if (!email || !password || !otp) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/reset_password", {
        email: email,
        otp: otp,
        password: password
      });

      setError("Your password Changed successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
        if (error.response && error.response.status === 401) {
            setError('invalid verification code');
          } else {
      setTimeout(() => {
        console.error("Forget pass error:", error);
        setError("Invalid Email");
      }, 300);
    }}
  };

  return (
    <div
      className="p-20 bg-image bg-[50%] bg-cover"
      style={{
        backgroundImage:
          "url(https://miro.medium.com/v2/resize:fit:1126/1*ELBnrKVFj1M-CaD3G-jVtA.jpeg)",
        height: "400px",
      }}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white px-20 py-5 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg">
          <h2 className="font-bold text-2xl mb-5 text-center">Reset Password</h2>

          <div>
            <input
              className="w-full p-2 border rounded-md mt-4"
              placeholder="your email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-2 border rounded-md mt-4"
              placeholder="Verification Code"
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              className="w-full p-2 border rounded-md mt-4"
              placeholder="New Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-red-500 transition delay-150 duration-300 ease-in-out">
              {error}
            </p>
          )}
          <br />
          <br />
          <button
            onClick={handlereset}
            className="w-full p-2 bg-teal-600 text-white rounded-3xl mt-4 hover:bg-teal-400"
          >
            Reset My Password
          </button>
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Resetpass;
