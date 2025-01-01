import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    axios
      .get("http://localhost:8000/products/") // Replace with your API endpoint
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Slider settings for the banner
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
  };

  return (
    <div className="">
      {/* Banner Section with Slider */}
      <div className="relative bg-gray-50 ">
        <Slider {...sliderSettings}>
          {[1, 2].map((slide, index) => (
            <div key={index} className="h-[600px]">
              <div
                // initial={{ opacity: 0, scale: 0.9 }}
                // animate={{ opacity: 1, scale: 1 }}
                // transition={{ duration: 1 }}
                className="relative bg-cover bg-center h-full"
                style={{
                  backgroundImage: `url('/public/hero-${slide}.jpg')`, // Replace with actual URLs
                }}
              >
                 <div className="absolute inset-0 bg-opacity-50 flex items-center pl-32">
          <div className="text-center ">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-4 "
            >
              Discover Your Style
            </motion.h2>
            <motion.p
               initial={{ opacity: 0, y: 80 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.7 }}
              className="mb-8"
            >
              Upgrade your wardrobe with our latest collection.
            </motion.p>
            <motion.button
              initial={{ y: 100 ,opacity:0}}
              whileInView={{ y: 0,opacity:1 }}
              transition={{ duration: 1.5,delay:0.2, type: "spring", }}
              className="bg-black px-12 py-3 text-white font-semibold hover:bg-white hover:text-black "
            >
              Shop Now
            </motion.button>
          </div>
        </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className=" mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="">
          <div className="flex justify-center flex-wrap gap-8">

            {products.length > 0 ? (
              products.map((product, i) => (
                <Link to='/shop'>
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white w-fit  flex flex-col rounded-lg overflow-hidden"
                >
                  <img
                    src={product.image || "https://via.placeholder.com/300x300"}
                    alt={product.name}
                    className=" object-cover"
                  />
                  <div className="p-10  gap-2 flex flex-col ml-12 w-fit">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-gray-600">₹{product.price}</p>
                   
                  </div>
                </motion.div>
                  </Link>
              )
              )
            ) : (
              <p>Loading products...</p>
            )}
          </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-16 text-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-neutral-200 p-6 rounded-lg shadow-md"
              >
                <p className="t mb-4">
                  "This is the best shopping experience I've ever had. Highly recommend!"
                </p>
                <p className=" font-bold">- Customer {i + 1}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer/>
    </div>
  );
};

export default Home;
