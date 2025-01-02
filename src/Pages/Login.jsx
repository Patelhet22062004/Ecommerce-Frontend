import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login() {
  var a = "wd"
  const [password, Password] = useState('');
  const [username, setusername] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please fill in the required field(s).');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', {
        username,
        password,
      });
      console.log(response.data)
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
  
      localStorage.setItem('userid', JSON.stringify(response.data.userid));
      navigate('/');  // Redirect after successful login
    } catch (error) {
      alert('Invalid credentials')
      setError(error.response?.data?.non_field_errors || 'Invalid credentials');
    }
  };
  
    return (
        <>
            <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
                    <h1 className="text-3xl font-bold text-center pb-12 text-gray-700">My Account</h1>
                <div className="w-full p-6 bg-white rounded-md max-w-md shadow-md lg:max-w-xl">
                    <form  onSubmit={handleSubmit} className="mt-6">
                        <div>
                        <h1 className='text-xl 
                        font-bold text-center text-gray-700'>Welcome Back</h1>
                        
                        <h6 className='text-sm font-normal text-center text-gray-700'>Please sign in to access your full account</h6>
                        </div>
                        <br />
                        <div className="mb-4">
                             <label htmlFor="text" className="block text-sm font-semibold text-gray-800">UserName </label> 
                            <input type="text" value={username} onChange={(e) => setusername(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div> 
                        {/* <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-800"> email address</label>
                            <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div> */}
                        <div className="mb-2">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">Password</label>
                            <input type="password" value={password} onChange={(e) => Password(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        <a href="/forget" className="text-xs text-blue-600 hover:underline">Forget Password?</a>
                        <div className="mt-2">
                           <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" >Login</button>
                        </div>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-700">Don't have an account? <Link to='/register' className="font-medium text-blue-600 hover:underline">Sign up</Link></p>
                </div>
            </div>
        </>
    )
}
export default Login