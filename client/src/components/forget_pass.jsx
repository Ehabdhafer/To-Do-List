import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const Forgetpass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleforget = async () => {
    if (!email) {
      setError("Email are required.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/forget_password", {
        email: email,
      });

      setError("code sent successful");
      navigate("/reset_password", { state: { email: email } });

    } catch (error) {
      setTimeout(() => {
        console.error("Forget pass error:", error);
        setError("Invalid Email");
      }, 300);
    }
  };

  return (
    <div
      className="p-20 bg-image bg-[50%] bg-cover"
      style={{
        backgroundImage:
        "url(https://blog.hubspot.com/hubfs/To_Do_List.png)",
        height: "400px",
      }}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white px-20 py-5 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg">
          <h2 className="font-bold text-2xl mb-5 text-center">Forget Password</h2>

          <div>
            <input
              className="w-full p-2 border rounded-md mt-4"
              placeholder="your email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleforget}
            className="w-full p-2 bg-teal-600 text-white rounded-3xl mt-4 hover:bg-teal-400"
          >
            Send Verification Code
          </button>
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Forgetpass;
