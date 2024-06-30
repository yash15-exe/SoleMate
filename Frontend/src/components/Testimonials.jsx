import React, { useState } from "react";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      author: "John Doe",
      text:
        "The shoes I bought from SoleMate are incredibly comfortable! They are perfect for my daily runs.",
      image: "https://randomuser.me/api/portraits/men/1.jpg", // Sample image URL
    },
    {
      id: 2,
      author: "Jane Smith",
      text:
        "I love the stylish design of the shoes I purchased from SoleMate. They are great for casual outings!",
      image: "https://randomuser.me/api/portraits/women/2.jpg", // Sample image URL
    },
    {
      id: 3,
      author: "Tom Brown",
      text:
        "SoleMate shoes are of excellent quality. They are durable and look fantastic!",
      image: "https://randomuser.me/api/portraits/men/3.jpg", // Sample image URL
    },
    {
      id: 4,
      author: "Sarah Johnson",
      text:
        "I am impressed with the customer service at SoleMate. They helped me find the perfect pair of shoes!",
      image: "https://randomuser.me/api/portraits/women/4.jpg", // Sample image URL
    },
    {
      id: 5,
      author: "Michael Clark",
      text:
        "The shoes from SoleMate are worth every penny. They provide great support and are stylish too.",
      image: "https://randomuser.me/api/portraits/men/5.jpg", // Sample image URL
    },
    {
      id: 6,
      author: "Emily White",
      text:
        "I recommend SoleMate to anyone looking for quality shoes. Their range is diverse and caters to different needs.",
      image: "https://randomuser.me/api/portraits/women/6.jpg", // Sample image URL
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (currentSlide - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="bg-gray-200 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 font-montserrat text-center">
          Customer Testimonials
        </h2>
        <div className="relative">
          <div className="lg:flex lg:justify-between">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`lg:w-${
                  testimonials.length > 2 ? "1/2" : "full"
                } lg:pr-4 mb-8 lg:mb-0`}
                style={{
                  display:
                    index !== currentSlide &&
                    index !== (currentSlide + 1) % testimonials.length
                      ? "none"
                      : "block",
                }}
              >
                <div className="flex bg-white p-8 rounded-lg shadow-lg">
                  <div className="w-1/3 flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="rounded-full h-24 w-24 mx-auto mb-4 object-cover"
                      style={{ minWidth: "6rem", minHeight: "6rem" }}
                    />
                  </div>
                  <div className="w-2/3 px-4">
                    <p className="text-lg mb-4 font-hand text-gray-800">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <p className="font-bold text-gray-700">
                      {testimonial.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="sm:hidden mt-4 flex justify-center">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setCurrentSlide(index)}
                className={`h-4 w-4 rounded-full mx-2 focus:outline-none ${
                  currentSlide === index ? "bg-gray-800" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
          <div className="hidden sm:flex justify-center mt-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setCurrentSlide(index)}
                className={`h-4 w-4 rounded-full mx-2 focus:outline-none ${
                  currentSlide === index ? "bg-gray-800" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
          
         
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
