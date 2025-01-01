import React from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user data from localStorage

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard, {user.username}!</h1>
      <p className="mt-2">You are logged in as {user.is_admin ? 'Admin' : 'Customer'}.</p>
      <div className="mt-4">
        <button
          onClick={() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            window.location.href = '/login';  // Redirect to login after logout
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
