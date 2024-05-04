"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
const APIURL = process.env.NEXT_PUBLIC_API;
const schema = yup.object().shape({
  name: yup.string().required("*Please enter your name"),
  email: yup.string().required("*Please enter your email address").email(),
  mobileNumber: yup
    .number()
    .min(10)
    .typeError("*Please enter your mobile phone number")
    .required("*Please enter your mobile phone number")
    .positive("*Please enter an actual phone number")
    .integer("*Please enter an actual phone number")
    .test(
      "len",
      "*Mobile number must be exactly 10 digits",
      (val) => (val + "").length === 10
    ),
  password: yup
    .string()
    .required("*Please enter a password")
    .min(6, "*Password must be at least 6 characters"),
});
const SignupForm = () => {
  const router = useRouter();
  // State to hold form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmitForm = async () => {
    console.log("Form Data:", formData);
    const accountRequest = new Request(`${APIURL}/api/v1/account/create`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    });
    const submittedData = await fetch(accountRequest);
    const data = await submittedData.json();
    console.log(data);
    if (data.error) {
      toast.error(data.message);
    }
    if (data.status === "success") {
      toast.success("Account Created");
      localStorage.setItem("token", data.token);
      router.push("/");
    }
  };

  return (
    <form
      method='POST'
      className='flex my-5 flex-col'
      onSubmit={handleSubmit(handleSubmitForm)}>
      <label className='flex my-2 flex-col'>
        Name :
        <input
          className='border-2 rounded-md'
          name='name'
          type='text'
          value={formData.name}
          {...register("name")}
          onChange={handleChange}
        />
        <p className='text-red-500'>{errors.name?.message}</p>
      </label>
      <label className='flex my-2 flex-col'>
        Email :
        <input
          className='border-2 rounded-md'
          name='email'
          type='text'
          value={formData.email}
          {...register("email")}
          onChange={handleChange}
        />
        <p className='text-red-500'>{errors.email?.message}</p>
      </label>
      <label className='flex my-2 flex-col'>
        Mobile :
        <input
          className='border-2 rounded-md'
          name='mobileNumber'
          type='tel'
          value={formData.mobileNumber}
          {...register("mobileNumber")}
          onChange={handleChange}
        />
        <p className='text-red-500'>{errors.mobileNumber?.message}</p>
      </label>
      <label className='flex my-2 flex-col'>
        Password :
        <input
          className='border-2 rounded-md'
          name='password'
          type='password'
          value={formData.password}
          {...register("password")}
          onChange={handleChange}
        />
        <p className='text-red-500'>{errors.password?.message}</p>
      </label>
      <button className='mt-5 border-2 border-black rounded-md' type='submit'>
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;
