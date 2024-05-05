const APIURL = process.env.API;
import React from "react";
import OrderComponents from "../../../../components/orderComponents";
import { cookies } from "next/headers";
import ConfirmOrder from "../../../../components/ConfirmOrder";
import { redirect } from "next/navigation";
const OrderPage = async ({ params }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const orderId = params.orderID;
  if (!orderId) {
    return redirect("/");
  }
  const currentOrderReq = new Request(
    `${APIURL}/api/v1/order/info/${orderId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );
  const response = await fetch(currentOrderReq);

  const data = await response.json();
  // console.log(data);
  return (
    <main className='min-h-[90%] p-2 bg-slate-50'>
      <h1 className='text-2xl font-bold'>Your Order information</h1>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-bold'>Order ID: {params.orderID}</h2>
        </div>
      </div>
      <div className='flex flex-col gap-2 my-3'>
        {data?.currentOrder?.orderdItems.map((item, index) => {
          return <OrderComponents product={item} key={item._id} />;
        })}
      </div>
      <div className='my-3'>
        Grand Total : {data?.currentOrder?.grandTotal} credits
      </div>
      <div className='my-3'>
        Order Status : {data?.currentOrder?.orderStatus}
      </div>
      <ConfirmOrder currentOrder={data} />
    </main>
  );
};

export default OrderPage;
