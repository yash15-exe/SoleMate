import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProductForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('productBrand', data.productBrand);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('availableUnits', data.availableUnits);
    formData.append('unitsSold', data.unitsSold);
    formData.append('taxRate', data.taxRate);
    formData.append('file', data.file[0]);

    try {
      const response = await axios.post(`/api/products/addProducts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Product added successfully!');
      console.log('Product added successfully:', response.data);
    } catch (error) {
      toast.error('Error adding product.');
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="text-center text-xl font-poppins p-2 mt-5 font-bold">Add a Product</div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4 border rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('name', { required: true })}
            />
            {errors.name && <span className="text-red-600 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Product Brand</label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('productBrand', { required: true })}
            />
            {errors.productBrand && <span className="text-red-600 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('description', { required: true })}
            />
            {errors.description && <span className="text-red-600 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('price', { required: true })}
            />
            {errors.price && <span className="text-red-600 text-sm">This field is required</span>}
          </div>

        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Available Units</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('availableUnits', { required: false })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Units Sold</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('unitsSold', { required: false })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('taxRate', { required: true })}
            />
            {errors.taxRate && <span className="text-red-600 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-gray-800 hover:file:bg-gray-200"
              {...register('file', { required: true })}
            />
            {errors.file && <span className="text-red-600 text-sm">This field is required</span>}
          </div>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </>
  );
};

export default AddProductForm;
