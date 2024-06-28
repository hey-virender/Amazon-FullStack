import React from "react";
import { useContext } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import NavBar from "../components/NavBar";
import { AmazonContext } from "../contexts/AmazonContext";
import UserInfo from "../components/UserInfo";
import Cookies from "js-cookie";

const SignUser = () => {
  const { showSignUp, toggleSignUp } = useContext(AmazonContext);
  const userName = Cookies.get("name");
  return (
    <div className="h-screen bg-zinc-600 py-5">
      {userName ? (
        <UserInfo />
      ) : showSignUp ? (
        <SignUp toggleSignUp={toggleSignUp} />
      ) : (
        <SignIn toggleSignUp={toggleSignUp} />
      )}
    </div>
  );
};

export default SignUser;
