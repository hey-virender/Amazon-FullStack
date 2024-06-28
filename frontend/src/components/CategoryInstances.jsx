import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const CategoryInstances = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState({
    electronics: [],
    homeAppliances: [],
    fashion: [],
    grocery: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (category) => {
    try {
      const response = await axios.get(`/amazon/products/${category}`);
      return response.data.slice(0, 4);
    } catch (error) {
      throw new Error(`Error fetching ${category} data: ${error.message}`);
    }
  };

  const loadAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const electronicsData = await fetchData("electronics");
      const homeAppliancesData = await fetchData("home appliances");
      const fashionData = await fetchData("fashion");
      const groceryData = await fetchData("grocery");

      setCategories({
        electronics: electronicsData,
        homeAppliances: homeAppliancesData,
        fashion: fashionData,
        grocery: groceryData,
      });
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData, location.pathname]); // Trigger reload when location changes

  const renderCategory = (title, items) => (
    <div className="category w-1/4 px-2 border rounded-lg shadow-md bg-white">
      <h2 className="text-md font-medium mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-2 place-items-center">
        {items.map((item, index) => (
          <div
            key={index}
            className="h-16 w-16 flex justify-center items-center shadow-lg rounded-md p-1"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain rounded-md"
            />
          </div>
        ))}
      </div>
      <button
        className="text-xs text-blue-700 rounded-md"
        onClick={() => {
          navigate(`/${title.toLowerCase()}`);
        }}
      >
        View All
      </button>
    </div>
  );

  return (
    <div className="px-3 w-full flex justify-around absolute -bottom-1 gap-8 left-1/2 transform -translate-x-1/2 bg-[#f0ad2821] backdrop-blur-md p-3">
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {renderCategory("Electronics", categories.electronics)}
              {renderCategory("Home Appliances", categories.homeAppliances)}
              {renderCategory("Fashion", categories.fashion)}
              {renderCategory("Grocery", categories.grocery)}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryInstances;
