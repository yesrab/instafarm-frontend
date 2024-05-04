"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const APIURl = process.env.NEXT_PUBLIC_API;
const Navigator = () => {
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [credit, setCredit] = useState(0);
  useEffect(() => {
    const data = localStorage.getItem("token");
    setToken(data);
  }, []);

  useEffect(() => {
    setCredit(countCredits());
  }, [token]);
  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    document.cookie = "token" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.refresh();
  };

  async function countCredits() {
    if (token) {
      const creditRequest = new Request(
        `${APIURl}/api/v1/account/creditCount`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await fetch(creditRequest);
      const res = await data.json();
      if (res.status === "success") {
        return res.credits;
      }
    }
    return 0;
  }

  return (
    <div className='ml-auto flex gap-3'>
      <Link
        className='border-2 border-cyan-500 px-3 rounded-md hover:bg-cyan-500 hover:text-white duration-300'
        href='/cart'>
        Cart
      </Link>
      <Link
        className='border-2 border-cyan-500 px-3 rounded-md hover:bg-cyan-500 hover:text-white duration-300'
        href='/credits'>
        Credits : {credit}
      </Link>
      {!!token ? (
        <button
          className='border-2 border-cyan-500 px-3 rounded-md hover:bg-cyan-500 hover:text-white duration-300'
          onClick={logOut}>
          Logout
        </button>
      ) : (
        <Link
          className='border-2 border-cyan-500 px-3 rounded-md hover:bg-cyan-500 hover:text-white duration-300'
          href='/account/login'>
          Login
        </Link>
      )}
    </div>
  );
};

export default Navigator;
