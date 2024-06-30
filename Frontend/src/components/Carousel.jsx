import React from 'react';
import ProductCard from './ProductCard';

function Carousel({ products = [], heading }) {
  return (
    <div className='my-8'>
      <h1 className='text-2xl font-bold mb-4 text-center'>{heading}</h1>
      <div className='flex overflow-x-auto space-x-4 p-4'>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
