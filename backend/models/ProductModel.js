import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: Array,
  features: Array,
  category: String,
  subcategory: String,
  image: String,
  rating: Number,
  discount: Number,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
