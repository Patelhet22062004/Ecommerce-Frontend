import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('userid');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token || !userId) {
        setError('User not authenticated. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/user/profile/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setFormData(response.data);
        setLoading(false);
        // alert("Updated Successfully")
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, userId]);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/user/profile/${userId}/`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(response.data);
      
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };
  const Handledelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/user/profile/${userId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
      localStorage.removeItem('userid')
      navigate('/register')
      alert("Account Delete Successfull")
    } catch (err) {
      console.error('Error Deleting profile:', err);
      alert('Failed to deleting profile. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white w-full max-w-sm shadow-lg rounded-lg p-6">
        {!isEditing ? (
          <div className="flex flex-col items-center">
            {/* <img
              className="w-24 h-24 rounded-full border-4 border-blue-500"
              src="https://via.placeholder.com/100"
              alt="User Avatar"
            /> */}
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
              Username: {formData.username}
            </h2>
            <p className="text-gray-500">Email:{formData.email}</p>
            <button
              onClick={toggleEdit}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700  font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                required
                value={formData.password}
                placeholder='Update Password'
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 border-None  p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={toggleEdit}
                className=" bg-gray-50 px-4 py-2  rounded hover:text-white hover:bg-gray-400"
              >
                Cancel
              </button>
              </div>
              <button
                type="button"
                onClick={Handledelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Account
              </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
