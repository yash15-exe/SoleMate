import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice.js";

function NavBar() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    { name: "New", options: ["Latest", "Trending"] },
    { name: "Men", options: ["Casual", "Formal", "Sports"] },
    { name: "Women", options: ["Flats", "Heels", "Sneakers"] },
  ];

  function DropdownCard({ options }) {
    return (
      <div className="absolute z-20 bg-white shadow-md p-4 mt-2 border border-gray-200 rounded">
        <ul>
          {options.map((option, index) => (
            <li key={index} className="py-1 px-2 hover:bg-gray-100" onClick={()=>navigate(`/products/search/${option}`)}>
              {option}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const user = useSelector((state)=> state.auth.user)
  const adminUsername = import.meta.env.VITE_ADMIN_USERNAME
  return (
    <>
      <nav className="flex items-center justify-between border-b-2 h-16 border-slate-700">
        <h1 className="mx-5 font-montserrat font-black italic tracking-widest text-2xl cursor-pointer" onClick={()=>navigate("/")}>SOLEMATE</h1>
        <ul className=" justify-center hidden lg:flex">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative px-4 py-2 cursor-pointer flex-grow text-center"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex font-poppins font-semibold tracking-wider">
                {item.name}
                {hoveredItem != index && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-down"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
                {hoveredItem == index && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-up"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                )}
              </div>

              {hoveredItem === index && item.options.length > 0 && (
                <DropdownCard options={item.options} />
              )}
            </li>
          ))}
        </ul>

        <div className="flex gap-5 px-5">
          {isLoggedIn && (
            <>
              <svg
                onClick={() => {
                  if (isLoggedIn) {
                    navigate("/cart");
                  }
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide cursor-pointer lucide-shopping-cart"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <button
                className="relative"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-30">
                    <ul>
                      <li
                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate("/userOrders")}
                      >
                        My Orders
                      </li>
                      <li
                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate("/userProfile")}
                      >
                        Profile
                      </li>
                      {(user.username == adminUsername)&& <li
                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate("/admin")}
                      >Admin Dashboard</li>}
                      <li
                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                        onClick={() => dispatch(logout())}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            </>
          )}
          {!isLoggedIn && (
            <button className="mx-4" onClick={() => navigate("/auth/login")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-in"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" x2="3" y1="12" y2="12" />
              </svg>
            </button>
          )}
        </div>
      </nav>
      <div>
        <ul className="flex md:hidden flex-grow justify-between">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative px-4 py-2 cursor-pointer flex-grow text-center"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex">
                {item.name}
                {hoveredItem != index && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-down"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
                {hoveredItem == index && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-up"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                )}
              </div>

              {hoveredItem === index && item.options.length > 0 && (
                <DropdownCard options={item.options} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default NavBar;
