import React from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AmazonContext } from "../contexts/AmazonContext";

const SignIn = ({ toggleSignUp }) => {
  const { Socket } = useContext(AmazonContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/amazon/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        Socket.emit("updateCartCount");
        Socket.emit("getCartItems");
        navigate("/");
      } else {
        // Handle unsuccessful login scenario
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again later.");
    }
  };
  return (
    <div className="p-8 bg-white border-[0.01rem] border-zinc-600 w-2/5 mx-auto my-4 rounded-xl shadow-xl relative">
      {error && <p className="text-red-600 text-xs">{error}</p>}

      <form onSubmit={handleLogin}>
        <div className="flex flex-col items-center w-4/5 mx-auto p-4 ">
          <input
            className="block border-[0.05rem] border-zinc-700 text-black w-52 text-center text-xs px-3 py-2 rounded-xl "
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="block border-[0.05rem] mt-6 border-zinc-700 text-black w-52 text-center text-xs px-3 py-2 rounded-xl "
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="mt-5 bg-yellow-400 border-[0.05rem] border-black px-3 py-1 rounded-full text-xs font-medium"
            type="submit"
          >
            Sign In
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-800">
          Don&apos;t have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleSignUp();
            }}
            className="text-blue-600 hover:text-blue-600"
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

SignIn.propTypes = {
  toggleSignUp: PropTypes.func.isRequired,
};

export default SignIn;
