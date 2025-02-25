import React, { useEffect, useState } from "react";

const ProgressBar = ({progress}: {progress: number}) => {
  // const [progress, setProgress] = useState(0);

  return (
    <div className="w-full p-4 bg-[#f67c2f] backdrop-blur-lg rounded-lg text-white mb-4">
      <h3 className="mb-2 text-lg font-semibold">Purchase Booster</h3>
      <div className="flex justify-between text-sm px-2">
          <span>0%</span>
          <span>3%</span>
          <span>5%</span>
          <span>7%</span>
          <span>10%</span>
        </div>
      <div className="relative w-full h-8 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-lg overflow-hidden">
        <div
          className="h-full bg-yellow-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-900">
        <span>$0+</span>
        <span>$200+</span>
        <span>$600+</span>
        <span>$1500+</span>
        <span>$3000+</span>
      </div>
      <div className="text-gray-900 mt-2">
      You will get <span className="text-white">{progress / 10}% bonus </span> for this purchase
      </div>
    </div>
  );
};

export default ProgressBar;
