import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RemoveFromCart from "./RemoveFromCart";
import { AmazonContext } from "../contexts/AmazonContext";
import { TbShoppingCartQuestion } from "react-icons/tb";

const Cart = () => {
  const { Socket } = useContext(AmazonContext);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartItems = async (data) => {
    setTotalPrice(0);
    if (data.type === "cartItemsUpdate") {
      setCartItems(data.items);
      let total = 0;
      data.items.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      setTotalPrice(total);
    }
  };

  Socket.on("cartItemsUpdate", fetchCartItems);

  useEffect(() => {
    Socket.on("getCartItems", fetchCartItems);
  });

  // Render conditionally based on cartItems and totalPrice
  if (totalPrice > 0 || cartItems.length > 0) {
    return (
      <div className="px-10 py-5">
        <h2 className="font-bold text-blue-600">Cart Items</h2>
        <div className="mt-12 mb-10 font-extrabold text-gray-900 text-right border-b-[0.1rem] border-orange-700">
          Total Price ₹ {totalPrice}
        </div>
        <div className="flex flex-wrap justify-evenly gap-1">
          {cartItems.map((item, index) => (
            <div key={index} className="w-1/6">
              <div className="h-28 w-28 mx-auto">
                <img
                  className="w-full h-full object-contain"
                  src={item.product.image}
                  alt={item.product.id}
                />
              </div>

              <p className="text-xs line-clamp-3 font-semibold text-center">
                {item.product.name}
              </p>
              <div className="flex items-center justify-around px-5 mt-4">
                <p className="font-medium text-sm text-orange-500">
                  Quantity {item.quantity}
                </p>
                <RemoveFromCart productId={item.product.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full flex flex-col items-center py-12 ">
        <TbShoppingCartQuestion className="text-8xl text-orange-600" />
        <span className="block text-zinc-800 font-medium">
          Nothing here.....
        </span>
      </div>
    );
  }
};

export default Cart;
