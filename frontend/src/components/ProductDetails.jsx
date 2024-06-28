import React from "react";

import StarRating from "./StarRating";
import AddToCart from "./AddToCart";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `/amazon/products/details/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  return (
    product && (
      <div className="flex py-5 px-3 overflow-hidden scrollbar-hide h-screen">
        <div className="w-2/5 h-full">
          <img
            className="w-full h-full object-contain"
            src={product.image}
            alt=""
          />
        </div>
        <div className="w-3/5 overflow-scroll h-screen scrollbar-hide">
          <h1 className="font-medium">{product.name}</h1>
          <StarRating rating={product.rating} />
          <div>
            <AddToCart id={product._id} />
          </div>

          <div className="px-4 my-7">
            <h2 className="my-4 font-bold">Features</h2>
            {product &&
              product.features.map((feature, index) => (
                <p className="text-sm" key={index}>
                  {feature}
                </p>
              ))}
          </div>
          <div className="px-3 mx-3 text-sm my-8">
            <h2 className="my-4 font-bold">Description</h2>
            <ul className="list-disc">
              {product &&
                product.description.map((description, index) => (
                  <li key={index}>{description}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
