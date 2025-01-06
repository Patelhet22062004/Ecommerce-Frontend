import React, { useState, useEffect } from "react";
import axios from "axios";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  });
  const token = localStorage.getItem("access_token");

  // Fetch cart items
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCart(response.data))
      .catch((error) => console.error("Error fetching cart:", error));
  }, [token]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit order
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/order/create/",
        { headers: { Authorization: `Bearer ${token}` } },
        { ...formData }
      )
      .then((response) => {
        alert("Order placed successfully!");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("Failed to place the order.");
      });
  };

  const totalPrice = Array.isArray(cart)
    ? cart.reduce(
        (total, item) => total + item.total * item.quantity,
        0
      )
    : 0;

  return (
    <div className=" bg-stone-100 h-full p-6 lg:p-12">
      <div className="max-w-7xl mx-auto ">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Checkout
      </h1>

      {/* Cart Overview */}
      <div className="flex flex-wrap md:flex-nowrap gap-8">
    <div className="bg-white w-2/3 h-full flex flex-col ml-24 md:ml-0 shadow-md p-6 rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
            <form onSubmit={handlePlaceOrder}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="mt-1 px-2  py-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                ></textarea>
              </div>
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="zip_code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zip_code"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleInputChange}
                    className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              {/* </div> */}
            </div>
            <button
              type="submit"
              className="mt-6  text-white py-2 px-10 hover:bg-emerald-950 font-semibold border shadow rounded-md bg-emerald-800 transition duration-300"
            >
              Place Order
            </button>
          </form>
        </div>
        <div className=" md:w-1/3 w-2/3 md:mt-0 mt-10 bg-white ml-24 md:ml-0 shadow-md p-6 rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="space-y-6">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                    <div className="flex flex-wrap md:flex-nowrap ">
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://127.0.0.1:8000${item.product_image}`}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.product_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex ml-36 ">
                  <p className="text-lg  font-semibold text-gray-700">
                    Rs {item.total * item.quantity}
                  </p></div></div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex justify-between text-xl font-semibold">
            <span>Total :</span>
            <span>Rs {totalPrice} </span>
          </div>
        </div>

        {/* Checkout Form */}
       
      </div></div>
    </div>
    
  );
};

export default Checkout;
