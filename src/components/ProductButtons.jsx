"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductButtons = ({ id }) => {
  const [token, setToken] = useState("");
  const router = useRouter();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const buyNow = (id) => {
    if (token) {
      toast(`product bought ${id}`);
    } else {
      toast("login to buy");
      router.push("/account/login");
    }
  };

  const addToCart = (id) => {
    if (token) {
      toast(`added product ${id}`);
    } else {
      toast("login to add to cart");
      router.push("/account/login");
    }
  };

  return (
    <span className='flex w-full px-3 justify-around mt-auto mb-4'>
      <button
        onClick={() => {
          addToCart(id);
        }}
        className='border-2 px-3 py-2 rounded-md bg-yellow-200 font-medium ease-in-out duration-300 hover:scale-110'>
        + add to cart
      </button>
      <button
        onClick={() => {
          buyNow(id);
        }}
        className='border-2 px-3 py-2 rounded-md bg-cyan-200 font-medium ease-in-out duration-300 hover:scale-110'>
        Buy now
      </button>
    </span>
  );
};

export default ProductButtons;
