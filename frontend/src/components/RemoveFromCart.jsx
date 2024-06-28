import React from "react";
import axios from "axios";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { PropTypes } from "prop-types";

import { AmazonContext } from "../contexts/AmazonContext";
import { useContext } from "react";

const RemoveFromCart = (productId) => {
  const { Socket } = useContext(AmazonContext);
  const removefromcart = async () => {
    console.log("Remove from cart clicked", productId);
    try {
      await axios.post(
        "/amazon/cart/remove-from-cart",
        { productId: productId },
        {
          withCredentials: true,
        }
      );
      Socket.emit("updateCartCount");
      Socket.emit("getCartItems");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="bg-[hsl(29,91%,52%)] text-white p-2 rounded-full"
      onClick={(e) => {
        e.preventDefault();
        removefromcart();
      }}
    >
      <MdOutlineRemoveShoppingCart />
    </div>
  );
};

RemoveFromCart.propTypes = {
  productId: PropTypes.string,
};

export default RemoveFromCart;
