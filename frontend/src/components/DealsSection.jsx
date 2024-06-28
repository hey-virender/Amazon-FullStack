import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

const DealsSection = () => {
  const navigate = useNavigate();
  const [dealsData, setDealsData] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 12,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/amazon/products/deals").then((response) => {
        setDealsData(response.data);
      });
    };
    fetchData();
  }, []);

  return (
    <div className="w-full mt-8 bg-white p-2">
      <h3 className="text-sm font-bold text-yellow-600">Today&apos;s Deals</h3>

      <Carousel responsive={responsive} arrows={false}>
        {dealsData.map((product, index) => (
          <div
            key={product._id}
            className=" select-none text-center flex flex-col justify-center items-center"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/products/${product._id}`);
            }}
          >
            <div className="h-12 w-12 ">
              <img
                className="h-full w-full object-contain select-none block mx-auto"
                key={index}
                src={product.image}
                alt="deal"
                draggable={false}
              />
            </div>
            <span className="text-xs tracking-tighter whitespace-nowrap capitalize text-center w-full text-blue-700">
              {product.subcategory}
            </span>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default DealsSection;
