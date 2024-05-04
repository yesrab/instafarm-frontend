import Link from "next/link";
import React from "react";
import SignupForm from "../../../../components/signupForm";
const SignupPage = () => {
  return (
    <main className='p-3'>
      <h1 className='text-center text-2xl font-bold'>
        Signup for your Insta Farm Account
      </h1>
      <div className='flex my-3 flex-col items-center justify-center min-h-[50vh]'>
        <SignupForm />
        <p className='my-3'>already have an account?</p>
        <Link className='border-2 rounded-md px-3' href='/account/login'>
          login
        </Link>
      </div>
    </main>
  );
};

export default SignupPage;
