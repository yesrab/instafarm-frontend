"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Back = () => {
  const router = useRouter();
  const backer = () => {
    router.replace("/");
  };
  return (
    <button
      className='border-2 rounded-md px-3 text-2xl bg-cyan-200'
      onClick={backer}>
      Back
    </button>
  );
};

export default Back;
