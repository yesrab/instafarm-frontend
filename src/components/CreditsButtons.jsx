"use client";
import React from "react";
import toast from "react-hot-toast";

const CreditsButtons = ({ credit }) => {
  const buyCredits = () => {
    toast.success(`You have purchased ${credit} credits`);
  };
  return (
    <span className='flex justify-center'>
      <button
        onClick={buyCredits}
        className='border-2 px-2 rounded-md hover:bg-gray-200 ease-in-out duration-300 hover:scale-110'>
        Buy Now!
      </button>
    </span>
  );
};

export default CreditsButtons;
