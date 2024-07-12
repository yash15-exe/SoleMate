import React from "react";

import Category from "../components/Category";
import Collection from "../components/Collection";
import Banner from "../components/Banner";
import Testimonials from "../components/Testimonials";

const dummyProducts = [
  {
    name: "Classic White T-Shirt rjgfrejslfjlrejlfjrgsrekmf;lrel;fkel;rkf   fewml;fkew",
    productBrand: "FashionHub",
    description:
      "A classic white t-shirt made from 100% cotton. Perfect for casual wear.",
    price: 499,
    category: "Clothing",
    imageUrl: "../src/assets/p2153171.avif",
    availableUnits: 150,
    unitsSold: 120,
    rating: {
      ratingCount: 30,
      totalRating: 120,
      averageRating: 4, // totalRating / ratingCount = 120 / 30
    },
  },
  {
    name: "Wireless Earbuds",
    productBrand: "TechGear",
    description:
      "High-quality wireless earbuds with noise cancellation and long battery life.",
    price: 2999,
    category: "Electronics",
    imageUrl: "../src/assets/p2153171.avif",
    availableUnits: 50,
    unitsSold: 200,
    rating: {
      ratingCount: 50,
      totalRating: 225,
      averageRating: 4.5, // totalRating / ratingCount = 225 / 50
    },
  },
  {
    name: "Sports Water Bottle",
    productBrand: "FitLife",
    description:
      "Durable sports water bottle with a built-in filter. Ideal for gym and outdoor activities.",
    price: 799,
    category: "Accessories",
    imageUrl: "../src/assets/p2153171.avif",
    availableUnits: 300,
    unitsSold: 180,
    rating: {
      ratingCount: 40,
      totalRating: 160,
      averageRating: 4, // totalRating / ratingCount = 160 / 40
    },
  },
  {
    name: "Gaming Laptop",
    productBrand: "GamerZone",
    description:
      "High-performance gaming laptop with the latest graphics card and fast processor.",
    price: 99999,
    category: "Electronics",
    imageUrl: "../src/assets/p2153171.avif",
    availableUnits: 20,
    unitsSold: 5,
    rating: {
      ratingCount: 10,
      totalRating: 45,
      averageRating: 4.5, // totalRating / ratingCount = 45 / 10
    },
  },
  {
    name: "Leather Wallet",
    productBrand: "StyleCraft",
    description:
      "Premium leather wallet with multiple card slots and a coin pocket.",
    price: 1999,
    category: "Accessories",
    imageUrl: "../src/assets/p2153171.avif",
    availableUnits: 100,
    unitsSold: 50,
    rating: {
      ratingCount: 20,
      totalRating: 90,
      averageRating: 4.5, // totalRating / ratingCount = 90 / 20
    },
  },
];

function Home() {
  return (
    <>
      <div className="w-full flex flex-col justify-center mt-14 lg:mt-1">
        <div className="flex justify-center">
          <Banner />
        </div>

        <Collection />
        <Category />
        <Testimonials />
      </div>
    </>
  );
}

export default Home;
