// src/components/Dashboard/ProgressBar.jsx
import React, { useEffect, useState } from "react";

function ProgressBar({ progress }) {
  const [width, setWidth] = useState("0%");
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    setTimeout(() => setWidth(`${progress}%`), 300);

    let start = 0;
    const duration = 700;
    const stepTime = Math.abs(Math.floor(duration / progress));
    const counter = setInterval(() => {
      start += 1;
      if (start >= progress) {
        clearInterval(counter);
        setAnimatedCount(progress);
      } else {
        setAnimatedCount(start);
      }
    }, stepTime);

    return () => clearInterval(counter);
  }, [progress]);

  return (
    <div className="mb-6">
      <p className="text-sm text-gray-500 mb-1">Overall Progress</p>
      <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-700 ease-in-out"
          style={{ width }}
        />
      </div>
      <p className="text-xs mt-1 text-gray-600">{animatedCount}% Completed</p>
    </div>
  );
}

export default ProgressBar;
