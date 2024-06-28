import React, { useEffect, useContext } from "react";
import { FaOpencart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AmazonContext } from "../contexts/AmazonContext";

const CartIcon = () => {
  const { Socket } = useContext(AmazonContext);
  const [cartCount, setCartCount] = React.useState(0); // Initial cart count state
  const navigate = useNavigate();

  // Function to handle cart count update from Socket

  Socket.on("cartCountUpdate", (data) => {
    console.log(data);
    if (data.type === "cartCountUpdate") {
      console.log("Received cart count update event:", data);
      setCartCount(data.count);
    } else {
      console.log("Unexpected cart count update event:", data);
    }
  });

  return (
    <div
      className="cart flex flex-col relative cursor-pointer"
      onClick={() => {
        Socket.emit("getCartItems");
        navigate("/cart");
      }}
    >
      <FaOpencart className="h-6 w-6 text-white" />
      <span className="text-white text-xs">Cart</span>
      <span className="absolute -top-2 left-6 text-md font-bold text-orange-500 z-20">
        {cartCount ? cartCount : 0}
      </span>
    </div>
  );
};

export default CartIcon;
