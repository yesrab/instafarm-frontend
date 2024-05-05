"use client";
const APIURL = process.env.NEXT_PUBLIC_API;
import CartItem from "@/components/CartItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const CartPage = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await axios.get(`${APIURL}/api/v1/cart/getCartData`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Cache-Control": "no-store",
      },
    });
    setData(response.data);
  };
  useEffect(() => {
    if (token) {
      getData();
    }
  }, [token]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleCheckout = async () => {
    if (token && data.cartItems.length > 0) {
      const response = await axios.post(
        `${APIURL}/api/v1/cart/purchaseCart`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Cache-Control": "no-store",
          },
        }
      );
      console.log(response.data);
      if (response.data.error) {
        return toast.error(response.data.message);
      }
      router.push(`/order/${response.data.orderId}`);
    }
  };

  return (
    <main className='min-h-[90%] p-2 bg-slate-50'>
      <h1 className='text-2xl font-bold'>Your cart</h1>
      <span className='flex my-2 justify-between w-full border-2 border-yellow-500 rounded-md px-6 py-2 bg-white shadow-md'>
        <h2>Total Cart Items : {data?.cartItems?.length}</h2>
        <h2>Total cart value: {data?.grandTotal} Credits</h2>
      </span>
      <div className='p-3 flex flex-col gap-5 '>
        {data?.cartItems?.map((product, index) => {
          return (
            <CartItem getData={getData} key={product._id} product={product} />
          );
        })}
      </div>
      <div className='flex items-center justify-between px-10'>
        <h1>Total payable amount: {data?.grandTotal} credits</h1>
        <button
          onClick={handleCheckout}
          className='bg-blue-500 p-2 rounded-md text-white duration-300 hover:bg-blue-600 hover:scale-105'>
          Checkout
        </button>
      </div>
    </main>
  );
};

export default CartPage;
export const dynamic = "force-dynamic";
