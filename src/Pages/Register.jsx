import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', {
        username,
        email,
        password,
      });

      setLoading(false);
      alert ('Account Created Successfully')
      navigate('/login');  // Redirect to login after successful registration
    } catch (err) {
      setLoading(false);
      // Check if the error response has message and handle it
      setError(err.response?.data?.detail || 'Registration failed, please try again.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
  <h1 className="text-3xl font-bold text-center pb-12 text-gray-700">Create new account</h1>      
                 <div className="w-full p-6 mt-12 bg-white rounded-md shadow-2xl lg:max-w-xl">

    <h2 className="text-xl font-bold text-center text-gray-500 mb-4">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
          </div>
          <div className="flex flex-col justify-center mb-4">
            <button
              type="submit"
              className=" px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
                                <p className="mt-4 text-sm text-center text-gray-700">Already have an account? <Link to='/login' className="font-medium text-blue-600 hover:underline">Sign in</Link></p>
            
          </div>
        </form>
      </div>
     </div>
  );
};

export default RegisterPage;
