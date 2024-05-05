"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const APIURL = process.env.NEXT_PUBLIC_API;
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
const CartItem = ({ product, getData }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const incQuantity = async (id) => {
    const patchQuantityRequest = new Request(
      `${APIURL}/api/v1/cart/editProductQuantity`,
      {
        method: "PATCH",
        body: JSON.stringify({
          quantity: product.productQuantity + 1,
          productId: id,
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if (token) {
      const data = await fetch(patchQuantityRequest);
      const resp = await data.json();
      if (resp.status === "success") {
        toast.success("Product quantity incremented successfully");
      }
      if (resp.error) {
        toast.error("Something went wrong");
      }
      getData();
    }
  };
  const decQuantity = async (id) => {
    const patchQuantityRequest = new Request(
      `${APIURL}/api/v1/cart/editProductQuantity`,
      {
        method: "PATCH",
        body: JSON.stringify({
          quantity: product.productQuantity - 1,
          productId: id,
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if (token) {
      const data = await fetch(patchQuantityRequest);
      const resp = await data.json();
      if (resp.status === "success") {
        toast.success("Product quantity decremented successfully");
      }
      if (resp.error) {
        toast.error("Something went wrong");
      }
      getData();
    }
  };
  return (
    <div className='flex flex-col md:flex-row justify-between bg-white p-3 rounded-md shadow-md'>
      <div className=' md:max-w-[200px] md:min-w-[199px]'>
        <Image
          src={product.image}
          width={100}
          height={100}
          className='w-[100%] md:w-auto'
          alt={product.productName}
        />
        <h2 className='font-bold my-2 text-center md:text-left'>
          {product.productName}
        </h2>
      </div>
      <div className='flex flex-col gap-2 justify-center'>
        <h1 className='font-bold text-center md:text-left'>Product Rate :</h1>
        <h2 className='text-center md:text-left'>
          {product.productRate} Credits
        </h2>
      </div>
      <div className='flex flex-col gap-2 justify-center'>
        <h1 className='font-bold text-center md:text-left'>
          Product quantity :
        </h1>
        <span className='flex gap-3 items-center justify-center md:justify-start'>
          <button
            onClick={() => {
              incQuantity(product.productId);
            }}
            className='border-2 p-3 rounded-md'>
            +
          </button>
          {product.productQuantity} Items
          <button
            onClick={() => {
              decQuantity(product.productId);
            }}
            className='border-2 p-3 rounded-md'>
            -
          </button>
        </span>
      </div>
      <div className='flex flex-col gap-2 justify-center'>
        <h1 className='font-bold text-center md:text-left'>
          Product subtotal :
        </h1>
        <h2 className='text-center md:text-left'>{product.subTotal} Credits</h2>
      </div>
    </div>
  );
};

export default CartItem;
