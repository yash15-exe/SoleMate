import React from "react";
import { useNavigate } from "react-router-dom";

function Collection() {
  const navigate = useNavigate();

  async function onSearchHandler(searchTerm) {
    navigate(`/products/search/${searchTerm}`);
  }

  const collections = [
    { name: "Men", imageSrc: "/assets/mensImage.webp" },
    { name: "Women", imageSrc: "/assets/womenShoes.webp" },
    { name: "Teen", imageSrc: "/assets/teenShoes.jpg" },
    { name: "Traditionals", imageSrc: "/assets/traditional.webp" },
  ];

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-center font-montserrat font-bold text-3xl mt-8">
        Shop By Collection
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 mx-auto">
        {collections.map((collection) => (
          <div
            key={collection.name}
            className="relative py-4 bg-slate-300 px-3 flex flex-col items-center shadow-lg"
            style={{
              backgroundImage: `url(${collection.imageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-lg"></div>
            <div className="relative z-10">
              <h1 className="font-poppins text-center tracking-wider text-xl font-semibold mb-2 text-white">
                {collection.name}
              </h1>
              <div className="h-72 w-64 overflow-hidden">
                <img
                  src={collection.imageSrc}
                  alt={collection.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <button
                onClick={() => onSearchHandler(collection.name)}
                className="w-full font-poppins flex gap-3 px-5 items-center text-xl bg-transparent py-3 font-semibold  mt-3 text-white hover:text-slate-300 transition-colors duration-200"
              >
                View Products
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-move-right"
                >
                  <path d="M18 8L22 12L18 16" />
                  <path d="M2 12H22" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collection;
