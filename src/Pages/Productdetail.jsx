import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();  // Get product ID from URL params
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");  // Store the selected thumbnail image

  useEffect(() => {
    // Fetch product data from API
    axios.get(`http://127.0.0.1:8000/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setSelectedImage(response.data.image);  // Set default main image
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  if(!product) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  return (
    <div className="max-wxl mx-auto py-48 px-48"> 
   
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
        {/* Main Image Section */}
        <div className="flex justify-end ">
          <div className="relative">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full max-w-7xl object-contain border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Thumbnail Images Section */}
      

        {/* Product Info Section */}
        <div className="flex flex-col ">
          <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
          <h2 className="text-xl text-gray-600 mt-2">{product.brand}</h2>

          <p className="text-lg mt-4 text-gray-800">{product.description}</p>

          <div className="mt-6 flex items-center ">
            <p className="text-xl font-bold text-blue-500">Rs {product.price}</p>
            <p className="text-sm text-gray-500 ml-20">In Stock: {product.stock}</p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex space-x-4">
            <button className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 transition duration-300">
              Add to Cart
            </button>
            <button className="border-2 border-blue-500 text-blue-500 py-2 px-6 rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>


      
         
    </div>
  );
};

export default ProductDetail;
