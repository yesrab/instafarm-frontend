"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const APIURL = process.env.NEXT_PUBLIC_API;

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

  const addToCart = async (id) => {
    if (token) {
      const addProductRequest = new Request(
        `${APIURL}/api/v1/cart/addProduct`,
        {
          method: "POST",
          body: JSON.stringify({ productId: id }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: id }),
        }
      );
      const response = await fetch(addProductRequest);
      const data = await response.json();
      if (data.status === "success") {
        toast.success(data.message);
      }
      if (data.error) {
        toast.error(data.error);
      }
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
      {/* <button
        onClick={() => {
          buyNow(id);
        }}
        className='border-2 px-3 py-2 rounded-md bg-cyan-200 font-medium ease-in-out duration-300 hover:scale-110'>
        Buy now
      </button> */}
    </span>
  );
};

export default ProductButtons;
