import Back from "@/components/Back";
import React from "react";

const page = ({ params }) => {
  const message = decodeURIComponent(params.state);

  return (
    <main className='h-screen flex flex-col gap-3 items-center justify-center'>
      <h1 className='text-6xl'>{message}</h1>
      <Back />
    </main>
  );
};

export default page;
