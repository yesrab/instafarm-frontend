import CreditsBanner from "@/components/CreditsBanner";
import React from "react";

const CreditsPage = () => {
  return (
    <main className='min-h-[90%] p-2 bg-slate-50'>
      <h1 className='text-5xl text-center'>
        Buy more credits for your account!
      </h1>
      <div className='flex  flex-col md:flex-row justify-center gap-16 my-3'>
        <div className='max-h-[65vh]'>
          <CreditsBanner tag='Insta credits budget pack!' credit={100} />
        </div>
        <div className='min-h-[75vh]'>
          <CreditsBanner tag='Insta credits mega pack!' credit={500} />
        </div>
        <div className='max-h-[65vh]'>
          <CreditsBanner tag='Insta credits medium pack!' credit={350} />
        </div>
      </div>
    </main>
  );
};

export default CreditsPage;
