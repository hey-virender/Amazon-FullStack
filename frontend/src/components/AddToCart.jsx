import React from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AmazonContext } from "../contexts/AmazonContext";

const AddToCart = ({ id }) => {
  const navigate = useNavigate();
  const { Socket } = useContext(AmazonContext);

  const addToCart = async (ProductId) => {
    try {
      if (Cookies.get("accessToken")) {
        await axios.post(
          "/amazon/cart/add-to-cart",
          { productId: ProductId },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
            withCredentials: true,
          }
        );

        Socket.emit("updateCartCount");
      } else {
        alert("Please login to add products to cart.");
        navigate("/signUser");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-4 my-1.5">
      <button
        onClick={(e) => {
          e.preventDefault();
          addToCart(id);
        }}
        className="bg-yellow-400 font-medium px-2 py-1 rounded-full text-sm"
      >
        Add to Cart
      </button>
    </div>
  );
};

AddToCart.propTypes = {
  id: PropTypes.string,
};

export default AddToCart;
