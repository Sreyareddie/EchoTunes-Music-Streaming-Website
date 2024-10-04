import React, { useState } from "react";
import axios from "axios";
import { url } from "../App";

const LoginModal = ({ onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage("");
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const address = isSignUp
        ? `${url}/api/user/signup`
        : `${url}/api/user/login`;
      const data = isSignUp ? { name, email, password } : { email, password };

      const response = await axios.post(address, data);

      if (response.data.token) {
        onLogin(response.data);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-[#121212] p-6 rounded-lg w-[90%] max-w-sm relative">
        <button
          className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-gray-400"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#ef0061] text-white font-bold rounded hover:bg-[#ff4155]"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-400">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </p>
          <button
            className="text-[#ef0061] font-semibold hover:underline"
            onClick={toggleForm}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </div>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginModal;
