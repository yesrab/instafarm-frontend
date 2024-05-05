"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Cashfree from "./CashFree";
const APIURL = process.env.NEXT_PUBLIC_API;
import { load } from "@cashfreepayments/cashfree-js";

const CreditsButtons = ({ credit }) => {
  const [payment, setPayment] = useState("");
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const buyCredits = async () => {
    if (token) {
      const response = await fetch(`${APIURL}/api/v1/account/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          purchasedCredits: credit,
          amount: parseInt(credit / 1.5),
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        // toast.success(`You have purchased ${credit} credits`);
        console.log(data);
        setPayment(data.sessionID);
        let checkOutOptions = {
          paymentSessionId: data.sessionID,
          returnUrl: `${APIURL}/api/v1/account/paymentStatus/{order_id}`,
        };
        let cashfree = await load({
          mode: "sandbox",
        });
        const response = await cashfree.checkout(checkOutOptions);
        // console.log(response);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Please login to purchase credits");
    }
  };
  return (
    <span className='flex justify-center'>
      <button
        onClick={buyCredits}
        className='border-2 px-2 rounded-md hover:bg-gray-200 ease-in-out duration-300 hover:scale-110'>
        Buy Now!
      </button>
    </span>
  );
};

export default CreditsButtons;
