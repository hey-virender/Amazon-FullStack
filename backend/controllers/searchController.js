import Product from "../models/ProductModel.js";

export const getSearchQuery = async (searchText) => {
  const products = await Product.find({ subcategory: searchText });
  return products;
};
