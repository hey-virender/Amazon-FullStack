import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const StarRating = ({ rating }) => {
  const stars = Array(5).fill(0);

  return (
    <div className="flex gap-1 items-center font-semibold py-1">
      {stars.map((_, index) => {
        const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
        return (
          <div key={index} className="relative w-4 h-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="absolute top-0 left-0 w-full h-full text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.262 6.95h7.314c.97 0 1.376 1.24.588 1.81l-5.93 4.28 2.263 6.95c.3.921-.755 1.688-1.538 1.175L12 18.011l-5.93 4.28c-.783.513-1.837-.254-1.538-1.175l2.263-6.95-5.93-4.28c-.788-.57-.382-1.81.588-1.81h7.314l2.262-6.95z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="absolute top-0 left-0 w-full h-full text-[#ffa41c]"
              style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.262 6.95h7.314c.97 0 1.376 1.24.588 1.81l-5.93 4.28 2.263 6.95c.3.921-.755 1.688-1.538 1.175L12 18.011l-5.93 4.28c-.783.513-1.837-.254-1.538-1.175l2.263-6.95-5.93-4.28c-.788-.57-.382-1.81.588-1.81h7.314l2.262-6.95z"
              />
            </svg>
          </div>
        );
      })}
      {rating}
    </div>
  );
};

export default StarRating;
