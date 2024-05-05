import React from "react";

const OrderComponents = ({ product }) => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      <p className='my-2'>Product: {product.productName}</p>
      <p className='my-2'>Quantity: {product.productQuantity}</p>
      <p className='my-2'>Price: {product.productRate}</p>
      <p className='my-2'>Total: {product.subTotal}</p>
    </div>
  );
};

export default OrderComponents;
