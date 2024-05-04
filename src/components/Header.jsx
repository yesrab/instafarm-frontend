import Link from "next/link";
import React from "react";
import Navigator from "./Navigator";

const Header = () => {
  return (
    <header className='h-[10%] flex items-center p-3 rounded-md shadow-md sticky top-0 bg-white'>
      <Link href='/'>
        <h1 className='text-2xl font-medium'>Insta Farm</h1>
      </Link>
      <Navigator />
    </header>
  );
};

export default Header;
