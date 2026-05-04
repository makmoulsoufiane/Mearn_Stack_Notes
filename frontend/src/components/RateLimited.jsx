import React from "react";

const RateLimited = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-100 text-green-700 p-6 rounded-xl shadow-md text-center">
        <h2 className="text-xl font-bold mb-2">Too Many Requests 🚫</h2>
        <p>Please wait a moment and try again.</p>
      </div>
    </div>
  );
};

export default RateLimited;
