// eslint-disable-next-line no-unused-vars
import React from "react";
const CategoryNav = () => {
  const categories = [
    "Amazon miniTV",
    "Sell",
    "Best Sellers",
    "Today's Deals",
    "Mobiles",
    "Fashion",
    "Electronics",
    "Prime",
    "New Releases",
    "Home & Kitchen",
    "Amazon Pay",
    "Customer Service",
    "Computers",
    "Books",
  ];
  return (
    <div className="flex gap-3 bg-zinc-900 py-3 px-2 justify-between">
      {categories.map((category, index) => (
        <span
          className="inline-block text-[10px] font-semibold text-zinc-300 outline-white"
          key={index}
        >
          {category}
        </span>
      ))}
    </div>
  );
};
export default CategoryNav;
