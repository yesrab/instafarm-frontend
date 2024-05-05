"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
const APIURL = process.env.NEXT_PUBLIC_API;
import { useRouter } from "next/navigation";
const ConfirmOrder = ({ currentOrder }) => {
  const router = useRouter();
  const [address, setAddress] = useState(""); // State to hold the textarea value
  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);
  const makeOrder = async () => {
    if (
      currentOrder?.customerCredits - currentOrder?.currentOrder?.grandTotal <
      0
    ) {
      return toast.error("Insufficient Balance");
    }
    if (!address) {
      return toast.error("Please enter your address");
    }
    const purchaseRequest = new Request(
      `${APIURL}/api/v1/order/completeOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          address,
          orderId: currentOrder?.currentOrder?._id,
        }),
      }
    );
    const data = await fetch(purchaseRequest);
    const json = await data.json();
    if (json.status === "success") {
      toast.success("Order Placed Successfully");
      router.push("/");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className='flex flex-col'>
      Confirm your Order at :
      <div className='flex'>
        <textarea
          className='p-2 my-3 border-2 border-gray-300 rounded-md w-[50%] h-[100px]'
          style={{ resize: "none" }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Enter your Address'
        />
        <div className='p-3 min-w-[200px]'>
          <p>Credit Cost : {currentOrder?.currentOrder?.grandTotal}</p>
          <p>Your Credits : {currentOrder?.customerCredits}</p>
          <hr />
          <p>
            Balance :{" "}
            {currentOrder?.customerCredits -
              currentOrder?.currentOrder?.grandTotal}
          </p>
        </div>
      </div>
      <button
        disabled={currentOrder?.currentOrder?.orderStatus === "PAID"}
        onClick={makeOrder}
        className='bg-blue-500 text-white p-2 rounded-md'>
        Confirm Order
      </button>
    </div>
  );
};

export default ConfirmOrder;
