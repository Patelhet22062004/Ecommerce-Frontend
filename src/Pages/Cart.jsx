import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("access_token");

  // Fetch the cart from the backend when the component mounts
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/cart/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setCart(response.data))
    .catch(error => console.error('Error fetching cart:', error));
  }, [token]);

  const handleRemoveFromCart = (productId) => {
    axios.delete(`http://127.0.0.1:8000/cart/${productId}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      // alert(response.data.message);
      // Remove the item from the cart state after deletion
      setCart(cart.filter(item => item.product_id !== productId));
    })
    .catch(error => console.error('Error removing from cart:', error));
  };

  const handleUpdateQuantity = (productId, quantityChange) => {
    axios.post('http://127.0.0.1:8000/cart/', {
      product_id: productId,
      quantity: quantityChange,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      // Re-fetch the cart to reflect the updated quantity
      axios.get('http://127.0.0.1:8000/cart/', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => setCart(response.data));
    })
    .catch(error => console.error('Error updating quantity:', error));
  };

  const totalPrice = cart.reduce((total, item) => total + item.product_price * item.quantity, 0);

  return (
    <div className=" shadow-lg mx-auto my-28 py-20 px-20">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/shop" className="text-blue-500">Go back to shopping</Link></p>
      ) : (
        <div className='flex gap-10 '>
          <ul className="space-y-10 md:w-2/3 shadow-sm p-2">
            <div className=' flex justify-between '>
              <div className=' text-lg font-bold mb-4 ml-10'>Product</div>
              <div className=' text-lg font-bold  mb-4 ml-28'>Quantity</div>
              <div className=' text-lg font-bold  mb-4 mr-3'>price</div>

            </div>
            {cart.map(item => (
              <div key={item.product_id} className="flex items-center justify-between border-b pb-4">
                <div className="flex flex-wrap">
                  <img 
                    src={'http://127.0.0.1:8000'+item.product_image} 
                    alt={item.product_name} 
                    className="w-40 rounded-lg hover:opacity-75 object-contain" 
                  />
                  <div className="flex flex-col justify-center  md:pl-9 pl-8">
                    <p className="text-xl font-semibold">{item.product_name}</p>
                    <p className="text-md font-bold text-slate-800">Rs {item.product_price}</p>
                    </div>
                      </div>
                    <div className="flex items-center ">
                      <button
                        className="px-3 py-1 bg-gray-200 rounded-md"
                        onClick={() => handleUpdateQuantity(item.product_id, -1)} // Decrease quantity
                      >
                        -
                      </button>
                      <p className="px-4 font-bold">{item.quantity}</p>
                      <button
                        className="px-3 py-1 bg-gray-200 rounded-md"
                        onClick={() => handleUpdateQuantity(item.product_id, 1)} // Increase quantity
                      >
                        +
                      </button>

                      
                    </div>
                 
               
                <button
                  className="text-red-500 p-2 shadow-md bg-neutral-50 rounded-sm ease-in-out duration-300 hover:scale-90"
                  onClick={() => handleRemoveFromCart(item.product_id)}
                >
                  Remove
                </button>
              </div>
            ))}
           <Link to='/shop'>
            <button className="hover:bg-black hover:text-white py-2 px-14  my-3 border  bg-white transition duration-300">
              COUNTINUE SHOPPING
            </button>
           </Link>
          </ul>

          <div className=" p-10 mt-2 flex flex-col gap-6 md:w-1/3 h-fit justify-center bg-gray-50 ">
            
            <p className="text-lg font-semibold ">Cart Total</p>
            <div className='flex justify-between'>
            <p className="text-lg font-semibold">Total</p>
            <p className="text-lg font-semibold text-red-500">Rs {totalPrice}.00</p>
          
            </div>

            
            <button className="bg-black text-white py-2 px-20  hover:bg-slate-600 transition duration-300">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
