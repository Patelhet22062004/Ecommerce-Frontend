import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('access_token');
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `http://127.0.0.1:8000/products/?category=${selectedCategory}`
          : 'http://127.0.0.1:8000/products/';
        const response = await axios.get(url,{
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="flex flex-wrap lg:justify-start justify-center gap-16 p-8">
      {products.length === 0 ? (
        <p>No products available for this category.</p>
      ) : (
        products.map((product) => (
          <Link
            key={product.id}
            to={`/Detail/${product.id}`}
            className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-200">
                {product.name} - {product.brand}
              </h4>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm text-gray-600">In Stock: {product.stock}</p>
                <p className="text-xl font-bold text-blue-500">₹{product.price}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ProductList;
