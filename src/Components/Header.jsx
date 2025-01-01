import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserLarge } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for side menu
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [localStorage.getItem('access_token')]); // Dependency on the token

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="shadow-md py-4 w-full bg-white relative">
      <div className="  px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <div className="text-2xl font-bold">ClothingStore</div>
        </Link>

        {/* Navigation Links for larger screens */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-gray-600 text-lg font-semibold">Home</Link>
          <Link to="/shop" className="hover:text-gray-600 text-lg font-semibold">Shop</Link>
          <Link to="/about" className="hover:text-gray-600 text-lg font-semibold">About</Link>
          <Link to="/contact" className="hover:text-gray-600 text-lg font-semibold">Contact</Link>
        </nav>

        {/* Authentication and Cart */}
        <div className="hidden md:flex space-x-4">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                className="py-3 px-1 rounded hover:scale-110 ease-in-out transform duration-200"
              >
                <FaUserLarge className="size-5" />
              </Link>
              <Link
                to="/cart"
                className="py-[10px] px-1 rounded"
              >
                <IoMdCart className="size-6" />
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-800 bg-gray-200 py-2 px-4 rounded text-lg hover:scale-90 ease-in-out transform duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Hamburger Icon for smaller screens */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 hover:text-gray-600 focus:outline-none"
          >
            {menuOpen ? (
              <p></p>
            ) : (
              <HiOutlineMenu className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>

      {/* Side Drawer for smaller screens */}
      <div
        className={`fixed inset-y-0 left-0 bg-white text-black  h-full  transform ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="p-4 flex justify-between items-center bg-">
            <span className="text-lg font-bold">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-black hover:text-gray-400"
            >
              <HiOutlineX className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Links */}
          <div className="p-6 flex justify-between">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="block bg-gray-200 py-2 px-4 rounded text-center hover:bg-gray-600"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <>
                 <Link
                to="/profile"
                className="py-3 px-1 rounded hover:scale-110 ease-in-out transform duration-200"
              >
                <FaUserLarge className="size-5" />
              </Link>
              <Link
                to="/cart"
                className="py-[10px] md:px-1 pr-20 rounded"
              >
                <IoMdCart className="size-6" />
              </Link>
              <button
                onClick={handleLogout}
                setMenuOpen={false}
                className="text-gray-800  bg-gray-200 py-2 px-4 rounded text-lg hover:scale-90 ease-in-out transform duration-200"
              >
                Logout
              </button>
              </>
            )}
          </div>
          <nav className="flex-grow p-6 space-y-4">
            <Link
              to="/"
              className="block text-lg hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block text-lg hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block text-lg hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-lg hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>

          {/* Authentication and Cart */}
        </div>
      </div>
    </header>
  );
};

export default Header;
