import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const productItems = [
    {
      title: "Listed Products",
      slug: "/admin/products/allProducts",
    },
    {
      title: "List a Product",
      slug: "/admin/products/addProducts",
    },
  ];
  const orderItems = [
    {
      title: "All Orders",
      slug: "/admin/orders/allOrders",
    },
    {
      title: "Cancelled Orders",
      slug: "/admin/orders/cancelledOrders",
    },
  ];

  const analytics = [
    {
      title: "Store Analytics",
      slug: "/admin/analytics",
    },
    {
      title: "Cancellation Requests",
      slug: "/admin/cancellationRequests",
    },
  ];
  const feedBack = [
    {
      title: "FeedBack",
      slug: "/admin/feedback",
    },
   
  ];

  return (
    <div className="flex h-screen ">
      <div className="flex flex-col h-screen  justify-evenly bg-slate-100 border-r-2 border-slate-300 px-3">
        <div className="font-poppins font-bold text-2xl">DashBoard</div>
        <div className=" w-72 flex flex-col ">
          <p className="text-slate-400 font-semibold font-poppins text-xl">
            Products
          </p>
          {productItems.map((item) => {
            return (
              <button
                className="bg-slate-200 mx-2 h-10 my-1"
                onClick={() => navigate(item.slug)}
              >
                {item.title}
              </button>
            );
          })}
        </div>
        <div className=" w-72 flex flex-col">
          <p className="text-slate-400 font-semibold font-poppins text-xl">
            Orders
          </p>
          {orderItems.map((item) => {
            return (
              <button
                className="bg-slate-200 h-10 mx-2 my-1"
                onClick={() => navigate(item.slug)}
              >
                {item.title}
              </button>
            );
          })}
        </div>
        <div className=" w-72 flex flex-col">
          <p className="text-slate-400 font-semibold font-poppins text-xl">
            Analytics
          </p>
          {analytics.map((item) => {
            return (
              <button
                className="bg-slate-200 h-10 mx-2 my-1"
                onClick={() => navigate(item.slug)}
              >
                {item.title}
              </button>
            );
          })}
        </div>
        <div className="  w-72 flex flex-col">
          <p className="text-slate-400 font-semibold font-poppins text-xl">
            FeedBack
          </p>
          {feedBack.map((item) => {
            return (
              <button
                className="bg-slate-200  h-10 mx-2 my-1"
                onClick={() => navigate(item.slug)}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full">
        <div className="h-14 font-poppins text-2xl items-center flex px-5 font-bold w-full border-b-2 border-slate-300 ">Welcome to Admin DashBoard, Yash</div>
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
