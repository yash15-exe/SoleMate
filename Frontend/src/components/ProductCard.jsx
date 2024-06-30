import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [shadowColor, setShadowColor] = useState("rgba(0, 0, 0, 0.5)");

  useEffect(() => {
    const getDominantColor = (imgElement) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;
      context.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);

      const imageData = context.getImageData(
        0,
        0,
        imgElement.width,
        imgElement.height
      );
      const data = imageData.data;
      const colorCounts = {};
      let maxCount = 0;
      let dominantColor = { r: 0, g: 0, b: 0 };

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const rgbString = `${r},${g},${b}`;
        colorCounts[rgbString] = (colorCounts[rgbString] || 0) + 1;

        if (colorCounts[rgbString] > maxCount) {
          maxCount = colorCounts[rgbString];
          dominantColor = { r, g, b };
        }
      }

      return `rgba(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b}, 0.5)`;
    };

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = product.imageUrl;
    img.onload = () => {
      const color = getDominantColor(img);
      setShadowColor(color);
    };
  }, [product.imageUrl]);

  return (
    <div
      className="h-96 w-64 rounded-lg overflow-hidden relative"
      style={{ boxShadow: `0 8px 10px 0 ${shadowColor}` }}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <div className="absolute bottom-0 left-0 h-48 right-0 p-4 bg-white rounded-b-lg">
        <div className="font-bold text-lg mb-2 font-poppins">
          {product.name}
        </div>
        <div className="text-gray-700 text-base mb-4">
          {product.description}
        </div>

        <div className="flex items-center justify-between gap-11 absolute bottom-2 ">
          <div className="font-semibold">
            <div>Price:</div>
            <div className="font-poppins text-2xl">${product.price}</div>
          </div>
          
          <button
            className="bg-gray-200 p-2 w-28 h-12 rounded-md text-center font-poppins hover:scale-105 hover:bg-slate-200"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <div className="flex items-center justify-between px-2">
            Details<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </div>
           
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
