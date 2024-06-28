import express from "express";
import Product from "../models/ProductModel.js";
const router = express.Router();

router.get("/details/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    if (productId) {
      const product = await Product.findById(productId);
      res.send(product);
    } else {
      console.log("Product id not provided");
    }
  } catch (error) {
    console.log("Fetching product by id failed", error);
  }
});

router.get("/deals", async (req, res) => {
  try {
    const deals = await Product.find({ discount: { $gt: 20 } });
    res.send(deals);
  } catch (error) {
    console.log("Fetching deals failed", error);
  }
});
router.get("/:category", async (req, res) => {
  const { category } = req.params;
  try {
    if (category == "all") {
      const allProducts = await Product.find();
      res.send(allProducts);
      return;
    } else {
      const products = await Product.find({ category: category });
      res.send(products);
    }
  } catch (error) {
    console.log("Fetching products by category failed", error);
  }
});

export { router as products };
