import React from "react";
import CreditsButtons from "./CreditsButtons";

const CreditsBanner = ({ credit, size, tag }) => {
  return (
    <div
      className={`drop-shadow-lg bg-white flex justify-around items-center flex-col p-3 min-h-[${size}vh] min-w-[24vw] rounded-xl`}>
      <h3 className='text-2xl text-center'>Add credits!</h3>
      <h1 className='text-center text-6xl font-medium'>{credit}</h1>
      <p className='max-w-[80%] text-center'>
        Use Insta Farm credits to purchase items at insta farm
      </p>
      <h1 className='font-medium'>{tag}</h1>
      <CreditsButtons credit={credit} />
    </div>
  );
};

export default CreditsBanner;
