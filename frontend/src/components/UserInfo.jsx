import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AmazonContext } from "../contexts/AmazonContext";

const UserInfo = () => {
  const navigate = useNavigate();
  const { Socket } = useContext(AmazonContext);

  const [details, setDetails] = useState();

  const handleLogout = async () => {
    await axios.post("/amazon/user/logout").then(() => {
      Cookies.remove("accessToken");
      Cookies.remove("name");
      Cookies.remove("cart");
      Socket.emit("updateCartCount");
      Socket.emit("getCartItems");

      navigate("/");
    });
  };
  React.useEffect(() => {
    const fetchProfile = async () => {
      await axios
        .post("/amazon/user/profile", {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          setDetails(response.data);
        });
    };
    fetchProfile();
  }, []);

  return (
    <div className="p-8 bg-white border-[0.01rem] border-zinc-600 w-2/5 mx-auto py-4  rounded-xl shadow-xl">
      <div className="flex flex-col items-center w-4/5 mx-auto p-4 ">
        <h2 className="block   text-black w-52 text-center text-xs px-3 py-2 rounded-xl font-bold">
          Name <span className="ml-5 font-medium"> {details?.name}</span>
        </h2>
        <h2 className="block  text-black w-52 text-center text-xs px-3 py-2 rounded-xl font-bold">
          Email <span className="ml-5 font-medium">{details?.email}</span>
        </h2>

        <button
          className="mt-5 bg-red-500 border-[0.05rem] border-black px-3 py-1 rounded-full text-xs font-medium"
          onClick={() => {
            handleLogout();
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
