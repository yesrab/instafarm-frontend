"use client";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const APIURL = process.env.NEXT_PUBLIC_API;

const schema = yup.object().shape({
  email: yup.string().required("Please enter your registered email").email(),
  password: yup.string().required("Please enter your password"),
});

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  async function handleSubmitFunc() {
    const loginURl = `${APIURL}/api/v1/account/login`;
    const accountRequest = new Request(loginURl, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    const request = await fetch(accountRequest);
    const data = await request.json();
    if (data.status === "success") {
      toast.success("logged in successfully");
      localStorage.setItem("token", data.token);
      router.push("/");
    }
    if (data.error) {
      toast.error("Incorrect email/password");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSubmitFunc)}
      method='POST'
      className='flex my-5 flex-col'>
      <label className='flex my-2 flex-col'>
        Email :
        <input
          className='border-2 rounded-md px-2'
          name='email'
          value={email}
          {...register("email")}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
        />
        <p className='text-red-500'>{errors.email?.message}</p>
      </label>
      <label className='flex my-2 flex-col'>
        Password :
        <input
          className='border-2 rounded-md px-2'
          name='password'
          type='password'
          value={password}
          {...register("password")}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='text-red-500'>{errors.email?.message}</p>
      </label>
      <button className='mt-5 border-2 border-black rounded-md'>Login</button>
    </form>
  );
};

export default LoginForm;
