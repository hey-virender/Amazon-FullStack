/* eslint-disable no-unused-vars */
import React from "react";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newUsername = Cookies.get("name");
      if (newUsername !== username) {
        setUsername(newUsername);
      }
    }, 1000); // Check every 1 second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [username]);

  return (
    <div className="sticky z-50 top-0 navbar w-full flex justify-evenly gap-40 bg-zinc-800 py-1 items-center ">
      <div
        className="logo h-12 flex items-center cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          className="h-full object-cover aspect-video"
          src="/navLogo.svg"
          alt=""
        />
      </div>
      <SearchBar />
      <div className="flex items-center gap-5 px-3">
        <div className="signIn text-white text-xs flex ">
          <span className="block">
            <Link to="/signuser">Hello {username ? username : "Sign In"}</Link>
          </span>
        </div>
        <CartIcon />
      </div>
    </div>
  );
};

export default NavBar;
