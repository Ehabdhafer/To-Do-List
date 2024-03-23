import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Authcontext";

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    } else {
      setError("");
    }

    if (!validatePassword(password)) {
      setError(`Password must be between 6 and 30 characters in length.`);
      return;
    } else {
      setError("");
    }

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email: email,
        password: password,
      });

      // Assuming the API returns a token
      login(response.data.token);

      // Set the token in a cookie
      // setCookie("token", token, { path: "/" });
      setError("Sign-in successful");
      navigate("/");
      window.location.reload();


    } catch (error) {
      // Delay the error message and handle it
      setTimeout(() => {
        console.error("Sign-in error:", error);
        setError("Sign-in failed. Email or password is invalid");
      }, 300);
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.(com|net)$/.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern =
    /^[A-Za-z0-9@#]*$/;
    return passwordPattern.test(password);
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
          <h2 className="font-bold text-2xl mb-5 text-center">SignIn</h2>

          <div>
            <input
              className="w-full p-2 border rounded-md mt-4"
              placeholder="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-2 border rounded-md mt-4"
              placeholder="Password"
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
            onClick={handleSignIn}
            className="w-full p-2 bg-teal-600 text-white rounded-3xl mt-4 hover:bg-teal-400"
          >
            Log In
          </button>
          <br />
          <br />
          <p className="text-center text-sm text-gray-500">
            Don't have an account yet ? {" "}
            <Link to={'/signup'}>
            <button
              className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
            >
              Sign up
            </button>
            .</Link>
          </p>
          <p className="text-center text-sm text-gray-500">
            <Link to={'/forget_pass'}>
            <button
              className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
            >
              Forgot password?
            </button>
            </Link>
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
