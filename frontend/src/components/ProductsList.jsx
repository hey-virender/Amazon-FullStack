import React from "react";
import PropTypes from "prop-types";
import StarRating from "./StarRating";
import { BiSolidBadge } from "react-icons/bi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddToCart from "./AddToCart";
const ProductsList = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [productsData, setProductsData] = React.useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/amazon/products/${category}`);
        setProductsData(response.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  if (!productsData.length) {
    return <div>No products available</div>; // Add a check for empty product list
  }

  return (
    <div>
      {productsData.map((product) => (
        <div
          key={product._id}
          className="w-full flex items-center gap-24 px-7 cursor-pointer hover:bg-zinc-100 hover:border-y-[0.01rem] hover:border-yellow-400 transition duration-200 ease-in-out transform "
        >
          <div
            className="w-1/5 h-full"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/products/${product._id}`);
            }}
          >
            <img
              className={`object-contain w-full h-full ${
                product.subcategory === "refrigerator" ||
                product.subcategory === "washing machine"
                  ? "scale-75"
                  : "scale-75"
              }`}
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="w-2/5 py-4">
            <h2
              className="font-medium text-[0.8rem] text-zinc-900"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/products/${product._id}`);
              }}
            >
              {product.name}
            </h2>
            <div className="flex items-center">
              <StarRating rating={product.rating} className="h-4 w-4" />
            </div>
            <div className="max-w-fit">
              <div className="priceSection relative mt-4">
                <h4 className="font-semibold text-zinc-800">
                  ₹{product.price}
                </h4>
                <BiSolidBadge className="text-yellow-400 h-8 w-8 absolute -top-4 -right-7" />
                <div className="absolute -top-2 -right-6 text-[0.65rem] font-bold">
                  -{product.discount}%
                </div>
                <AddToCart id={product._id} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

ProductsList.propTypes = {
  productsData: PropTypes.array,
};

export default ProductsList;
