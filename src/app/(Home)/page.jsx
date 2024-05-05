import Product from "@/components/Product";

const APIURL = process.env.NEXT_PUBLIC_API;

async function Home() {
  const response = await fetch(`${APIURL}/api/v1/products/allProducts`, {
    cache: "no-store",
  });
  const data = await response.json();

  return (
    <main className='min-h-[90%] p-2 bg-slate-50'>
      <h1 className='text-2xl px-5'>All products !</h1>
      <div className='flex flex-wrap justify-center gap-5 p-3'>
        {data?.allProducts?.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </main>
  );
}
export default Home;

