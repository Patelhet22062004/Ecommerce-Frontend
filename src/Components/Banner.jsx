import React from 'react';

const Banner = () => {
  return (
    <section className="bg-cover bg-center h-[60vh] text-white flex items-center justify-center" style={{ backgroundImage: 'url("https://via.placeholder.com/1500x600")' }}>
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold">Welcome to Our Store!</h2>
        <p className="mt-4 text-lg">Explore the best products at the best prices.</p>
        <button className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">Shop Now</button>
      </div>
    </section>
  );
};

export default Banner;
