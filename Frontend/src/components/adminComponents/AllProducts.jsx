import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products/getAllProducts`); // Adjust the endpoint URL according to your setup
        setProducts(response.data.allProducts);
      } catch (err) {
        setError('Failed to fetch products');
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleUnlistProduct = async (productId) => {
    const confirmed = window.confirm('Are you sure you want to unlist this product?');
    if (confirmed) {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products/unlistProducts`, { productId }); // Adjust the endpoint URL according to your setup
        setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        toast.success('Product unlisted successfully');
      } catch (error) {
        console.error('Failed to unlist product', error);
        toast.error('Failed to unlist product');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 font-poppins">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      {products.length === 0 ? (
        <div>No products found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <div className="mb-2"><strong>Brand:</strong> {product.productBrand}</div>
              <div className="mb-2"><strong>Description:</strong> {product.description}</div>
              <div className="mb-2"><strong>Price:</strong> ${product.price}</div>
              <div className="mb-2">
                <img src={product.imageUrl} alt={product.name} className="w-full h-auto" />
              </div>
              <div className="mb-2"><strong>Available Units:</strong> {product.availableUnits}</div>
              <div className="mb-2"><strong>Units Sold:</strong> {product.unitsSold}</div>
              <div className="mb-2">
                <strong>Rating:</strong> {product.rating.averageRating.toFixed(1)} ({product.rating.ratingCount} reviews)
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleUnlistProduct(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Unlist Product
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllProducts;
