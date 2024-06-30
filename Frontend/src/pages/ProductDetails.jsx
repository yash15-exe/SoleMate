import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true); // State to manage loading
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/product`, { productId })
      .then((res) => res.data.product)
      .then((data) => {
        setProduct(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [productId]);

  async function addToCart() {
    if (isLoggedIn) {
      const username = user.username;
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/addToCart`, { productId, username });
        navigate("/cart");
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add product to cart. Please try again.");
      }
    } else {
      navigate("/auth/login");
    }
  }

  function viewCart() {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      navigate("/auth/login");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-2xl text-black">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 border-r pr-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg hover:opacity-75 transition-opacity duration-300"
          />
        </div>
        <div className="md:w-1/2 md:pl-4 bg-gray-200 p-3 rounded-lg ">
          <div className="border-b mb-4 pb-4">
            <h1 className="text-3xl font-bold mb-2 text-black">{product.name}</h1>
            <p className="text-xl font-semibold text-gray-700 mb-2">{product.productBrand}</p>
            <p className="text-lg mb-4 text-black">{product.description}</p>
            <p className="text-2xl font-bold text-red-600 mb-4">${product.price?.toFixed(2)}</p>
          </div>
          <div className="border-b mb-4 pb-4">
            <p className="text-md text-gray-600 mb-2">
              Available Units: {product.availableUnits}
            </p>
            <p className="text-md text-gray-600 mb-2">
              Units Sold: {product.unitsSold}
            </p>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-md text-gray-600">Rating: </p>
            <p className="text-md text-yellow-500 ml-2">
              {product.rating.averageRating?.toFixed(1)} / 5
            </p>
            <p className="text-md text-gray-600 ml-2">
              ({product.rating.ratingCount} reviews)
            </p>
          </div>
          <div>
            <button
              className="bg-black text-white px-4 py-2 rounded mr-2 hover:bg-gray-800"
              onClick={addToCart}
            >
              Add to Cart
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              onClick={viewCart}
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
