import React from "react";

const Footer = () => {
    return (
        <>
            <footer className="bg-slate-100 text-gray-700">
                <section className="grid grid-cols-1  max-w-7xl mx-auto md:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
                    <div>
                        <h2 className="font-bold  text-lg mb-4">About Us</h2>
                        <p className=" text-sm ">
                            We bring you the latest fashion trends at unbeatable prices. Shop
                            from our extensive range of clothes, shoes, and accessories for
                            every occasion.
                        </p>
                        <div className="mt-4">
                            <img src="../../public/payment.png" alt="Payment Methods" className=" max-w-xs" />
                        </div>
                    </div>

                    <div>
                        <h2 className="font-bold   text-lg mb-4">Popular Categories</h2>
                        <ul className="flex flex-col gap-3">
                            <li className=" text-sm hover:  cursor-pointer">Men's Clothing</li>
                            <li className=" text-sm hover:  cursor-pointer">Women's Clothing</li>
                            <li className=" text-sm hover:  cursor-pointer">Kid's Wear</li>
                            <li className=" text-sm hover:  cursor-pointer">Footwear</li>
                            <li className=" text-sm hover:  cursor-pointer">Accessories</li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h2 className="font-bold  text-lg mb-4">Customer Support</h2>
                        <ul className="flex flex-col gap-3">
                            <li className=" text-sm hover:  cursor-pointer">Help Center</li>
                            <li className=" text-sm hover:  cursor-pointer">FAQs</li>
                            <li className=" text-sm hover:  cursor-pointer">Returns & Refunds</li>
                            <li className=" text-sm hover:  cursor-pointer">Shipping Policy</li>
                            <li className=" text-sm hover:  cursor-pointer">Contact Us</li>
                        </ul>
                    </div>

                    {/* Connect with Us */}
                    <div>
                        <h2 className="font-bold  text-lg mb-4">Connect with Us</h2>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover: text-blue-700 hover:bg-gray-200"
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover: text-pink-600 hover:bg-gray-200"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover: text-blue-400 hover:bg-gray-200"
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover: text-red-600 hover:bg-gray-200"
                            >
                                <i className="fab fa-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Bottom Footer */}
                <div className="bg-slate-200 py-4  text-center">
                    <p className=" text-sm">© 2024 Your Brand Name. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
