import React from 'react';

function AboutUsPage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 font-montserrat">About SoleMate</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 font-montserrat">Yash Raikar</h2>
        <p className="text-gray-700 mb-2 font-poppins">
          Hi, I'm Yash Raikar, a third-year engineering student specializing in IT. I have a
          passion for coding and building applications, especially in the field of web development.
          I love playing video games and have a keen interest in trains and other machines.
        </p>
        <p className="text-gray-700 mb-2 font-poppins">
          I aspire to become a millionaire by the age of 25 and am determined to make impactful
          decisions in my life. I am continuously working on improving my coding and communication
          skills to achieve my goals.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2 font-montserrat">About SoleMate</h2>
        <p className="text-gray-700 mb-2 font-poppins">
          SoleMate is an e-commerce website I built using the MERN stack (MongoDB, Express, React,
          Node.js). It is specifically designed for selling shoes to young and energetic customers.
          The website includes features such as user authentication, CRUD operations, payment integration using Stripe, and more.
        </p>
        <p className="text-gray-700 mb-2 font-poppins">
          I designed SoleMate to be responsive, user-friendly, and visually appealing, showcasing
          my skills in frontend development and UI/UX design. This project serves as a testament to
          my ability to work with complex functionalities and technologies in a real-world scenario.
        </p>
      </div>
    </div>
  );
}

export default AboutUsPage;
    