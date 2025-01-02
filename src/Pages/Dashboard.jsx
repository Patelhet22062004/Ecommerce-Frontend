import React ,{useState,useEffect} from 'react';

const Dashboard = () => {
    const [user, setFormData] = useState({});
    const userId=localStorage.getItem('userid')

    const token=localStorage.getItem('access_token')

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
        setFormData(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, userId]);
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
