import Product from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";
import verifyToken from "../utils/verifyToken.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  } else {
    const decoded = await verifyToken(req.cookies.accessToken);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      const email = decoded.email;
      const user = await UserModel.findOne({ email: email });
      await user.cart.push(product);
      await user.save();
      res.status(200).json({ message: "Product added to cart" });
    }
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body.productId;
  console.log("Product id to remove", productId);
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = await verifyToken(token);
    if (!decoded) {
      console.log("Invalid token", token);
      return res.status(401).json({ message: "Not valid token" });
    }

    const email = decoded.email;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const productIdObj = new mongoose.Types.ObjectId(productId);

    const index = user.cart.findIndex((id) => id.equals(productIdObj));

    if (index !== -1) {
      user.cart.splice(index, 1);
      await user.save();
      console.log("Product removed from cart");
      return res.status(200).json({ message: "Product removed from cart" });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCartCount = async (token) => {
  if (token) {
    try {
      const decoded = await verifyToken(token);
      if (decoded) {
        const email = decoded.email;
        const user = await UserModel.findOne({ email: email });
        const cartCount = user.cart.length;
        return cartCount;
      }
    } catch (err) {
      console.error("Error verifying token:", err);
      return 0;
    }
  } else {
    return 0;
  }
};

export const getCartItems = async (token) => {
  if (!token) {
    console.log("No token found");
    return console.log("No token found");
  }

  try {
    const decoded = await verifyToken(token);
    if (!decoded) {
      console.log("Invalid token", token);
      return console.log("Unauthorized");
    }
    const email = decoded.email;

    const user = await UserModel.findOne({ email: email }).populate("cart");

    // Create a map to count the occurrences of each product ID
    const productCountMap = user.cart.reduce((acc, product) => {
      const productId = product._id.toString(); // Ensure the ID is treated as a string

      if (acc[productId]) {
        acc[productId].quantity += 1; // Increment quantity
      } else {
        acc[productId] = {
          quantity: 1,
          product: {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
          },
        };
      }
      return acc;
    }, {});

    // Convert the product count map to an array
    const products = Object.values(productCountMap);

    return products;
  } catch (err) {
    console.error(err);
  }
};
