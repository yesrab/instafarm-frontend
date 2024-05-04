import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <main className='p-3'>
      <h1 className='text-center text-2xl font-bold'>
        Login to your Insta Farm Account
      </h1>
      <div className='flex my-3 flex-col items-center justify-center min-h-[50vh]'>
        <LoginForm />
        <p className='my-3'>Dont have an account?</p>
        <Link className='border-2 rounded-md px-3' href='/account/signup'>
          Create account
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
