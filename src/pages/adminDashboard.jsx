import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRooms: 0,
    activeBookings: 0,
    totalUsers: 0
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/');
      return;
    }

    // Fetch dashboard data
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        
        // Create requests but handle them individually for better error handling
        const requests = [
          axios.get('https://hotel-management-back.vercel.app/admin/bookings', {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(err => ({ data: [] })), // Return empty array on error
          
          axios.get('https://hotel-management-back.vercel.app/rooms', {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(err => ({ data: [] })), // Return empty array on error
          
          axios.get('https://hotel-management-back.vercel.app/admin/users', {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(err => ({ data: [] })) // Return empty array on error
        ];
        
        const [bookingsRes, roomsRes, usersRes] = await Promise.all(requests);
        
        // If we got data from at least one endpoint, consider it a partial success
        if (bookingsRes.data || roomsRes.data || usersRes.data) {
          setStats({
            totalBookings: bookingsRes.data?.length || 0,
            totalRooms: roomsRes.data?.length || 0,
            activeBookings: (bookingsRes.data || [])
              .filter(b => b.status === 'Booked' || b.status === 'Checked In').length,
            totalUsers: usersRes.data?.length || 0
          });
        } else {
          // If all requests failed, show error message
          setError('Unable to connect to the server. Please make sure the backend API is running.');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Error fetching dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
            <p className="mt-2 text-sm">
              Make sure your Flask backend server is running. Run "python backend/app.py" in your terminal.
            </p>
          </div>
        )}
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold text-blue-800">{stats.totalBookings}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Rooms</h3>
            <p className="text-3xl font-bold text-blue-800">{stats.totalRooms}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Active Bookings</h3>
            <p className="text-3xl font-bold text-blue-800">{stats.activeBookings}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-800">{stats.totalUsers}</p>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Rooms Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Rooms Management</h2>
            <p className="text-gray-600 mb-4">Manage hotel rooms, add new rooms, edit details, and set availability.</p>
            <button
              onClick={() => navigate('/admin/rooms')}
              className="w-full bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition duration-300"
            >
              Manage Rooms
            </button>
          </div>

          {/* Bookings Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Bookings Management</h2>
            <p className="text-gray-600 mb-4">View all bookings, check-in/out guests, and manage booking statuses.</p>
            <button
              onClick={() => navigate('/admin/bookings')}
              className="w-full bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition duration-300"
            >
              Manage Bookings
            </button>
          </div>

          {/* User Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">User Management</h2>
            <p className="text-gray-600 mb-4">Manage user accounts, add new users, and assign admin privileges.</p>
            <button
              onClick={() => navigate('/admin/users')}
              className="w-full bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition duration-300"
            >
              Manage Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
