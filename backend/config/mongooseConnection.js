import mongoose from "mongoose";

const Connection = mongoose.connect("mongodb://localhost/AmazonDB");

export default Connection;
