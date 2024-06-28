import React from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SignUp = ({ toggleSignUp }) => {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const validateForm = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("Please fill out all fields");
      return false;
    }
    if (password !== confirmPassword) {
      setEmail("Passwords do not match");
      return false;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    else {
      const response = await axios.post("/amazon/user/register", {
        name,
        email,
        password,
        
      });
      console.log(response);
      if (response.status === 201) {
        
        navigate("/");
      } else {
        setError(response.data.message);
      }
    }
  };
  return (
    <div className="p-8 bg-white border-[0.01rem] border-zinc-600 w-2/5 mx-auto my-4 rounded-xl shadow-xl">
      {error && (
        <h2 className="text-sm font-semibold text-center text-red-600 mb-4">
          Sign Up
        </h2>
      )}
      <form onSubmit={handleSignUp}>
        <div className="flex flex-col items-center w-4/5 mx-auto p-4 ">
          <input
            className="block border-[0.05rem] border-zinc-700 text-black w-52 text-center text-xs px-3 py-2 rounded-xl "
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="block border-[0.05rem] mt-6 border-zinc-700 text-black w-52 text-center text-xs px-3 py-2 rounded-xl "
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
          <input
            className="block border-[0.05rem] mt-6 border-zinc-700 text-black w-52 text-center text-xs px-3 py-2 rounded-xl "
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="mt-5 bg-yellow-400 border-[0.05rem] border-black px-3 py-1 rounded-full text-xs font-medium"
            type="submit"
          >
            Sign Up
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-800">
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleSignUp();
            }}
            className="text-blue-500 hover:text-blue-600"
          >
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  toggleSignUp: PropTypes.func,
};

export default SignUp;
