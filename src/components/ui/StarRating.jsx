import React from "react";

const StarRating = ({ value = 0, max = 5, step = 1, onChange, readOnly = false }) => {
  const handleClick = (val) => {
    if (readOnly) return;
    onChange(val);
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => {
        let fillClass = "text-gray-300";

        if (value >= star) {
          fillClass = "text-yellow-400"; 
        } else if (value >= star - 0.5) {
          fillClass = "text-yellow-300"; 
        }

        return (
          <svg
            key={star}
            onClick={() => handleClick(step === 0.5 ? star - 0.5 + step : star)}
            className={`w-5 h-5 cursor-pointer transition-colors ${fillClass}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.945c.3.922-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.784.57-1.838-.196-1.539-1.118l1.287-3.945a1 1 0 00-.364-1.118L2.037 9.373c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.946z" />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;