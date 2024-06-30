import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()
  const handleSearch = async () => {
    if(searchTerm!=""){
      navigate(`/products/search/${searchTerm||""}`)
    }
   
  };

  return (
    <div className="flex w-full  mt-2 md:w-3/5 lg:w-1/2 mx-auto border rounded overflow-hidden">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="px-4 py-2 w-full focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-black text-white px-4 py-2"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
