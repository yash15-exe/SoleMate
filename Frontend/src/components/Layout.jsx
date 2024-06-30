import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 z-50 w-full bg-white bg-opacity-70 backdrop-blur-md pb-2 mb-2">
        <NavBar />
        <SearchBar />
      </div>
      <div className="flex-grow pt-[140px]"> {/* Adjust the padding value as needed */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
