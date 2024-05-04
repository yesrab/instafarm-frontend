import Image from "next/image";
import React from "react";
import ProductButtons from "./ProductButtons";

const Product = ({ product }) => {
  return (
    <div className='flex flex-col items-center justify-center shadow-lg p-3 rounded-lg w-[95vw] lg:max-w-md bg-white'>
      <Image src={product.image} height={300} width={300} alt={product.name} />
      <h3 className='text-xl w-full my-1'>Name : {product.name}</h3>
      <p className='w-full my-1'>Details : {product.description}</p>
      <span className='flex items-center gap-2 w-full my-3'>
        Price : <h3 className='text-2xl'>{product.price}</h3> credits
      </span>
      <ProductButtons id={product._id} />
    </div>
  );
};

export default Product;
