"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navigator = () => {
  const router = useRouter();

  const [token, setToken] = useState("");
  useEffect(() => {
    const data = localStorage.getItem("token");
    setToken(data);
  }, []);
  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    router.refresh();
  };
  return (
    <div className='ml-auto flex gap-3'>
      <Link href='/cart'>Cart</Link>
      <Link href='/credits'>Credits</Link>
      {!!token ? (
        <button onClick={logOut}>Logout</button>
      ) : (
        <Link href='/account/login'>Login</Link>
      )}
    </div>
  );
};

export default Navigator;
