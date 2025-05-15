import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    is_admin: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/');
      return;
    }
    
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://hotel-management-back.vercel.app/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users. Make sure your backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://hotel-management-back.vercel.app/auth/register', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
      setShowAddModal(false);
      setFormData({
        email: '',
        password: '',
        is_admin: false
      });
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.response?.status === 403) {
        setError('You do not have permission to create users. Admin access is required.');
      } else {
        setError('Error creating user. Please try again later.');
      }
    }
  };

  const handleRoleChange = async (userId, isAdmin) => {
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`https://hotel-management-back.vercel.app/admin/users/${userId}`, 
        { is_admin: isAdmin },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      if (error.response?.status === 403) {
        setError('You do not have permission to update user roles. Admin access is required.');
      } else {
        setError('Error updating user role. Please try again later.');
      }
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://hotel-management-back.vercel.app/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        if (error.response?.status === 403) {
          setError('You do not have permission to delete users. Admin access is required.');
        } else {
          setError('Error deleting user. Please try again later.');
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Users</h1>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900"
          >
            Add New User
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
            {error.includes('server') && (
              <p className="mt-2 text-sm">
                Make sure your Flask backend server is running. Run "python backend/app.py" in your terminal.
              </p>
            )}
          </div>
        )}

        {/* Users Table */}
        {users.length === 0 && !loading && !error ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 mb-4">No users found. Add a new user to get started.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900"
            >
              Add New User
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.is_admin ? 'admin' : 'user'}
                        onChange={(e) => handleRoleChange(user._id, e.target.value === 'admin')}
                        className="text-sm border rounded-md px-2 py-1"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6">Add New User</h2>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_admin"
                    checked={formData.is_admin}
                    onChange={(e) => setFormData({ ...formData, is_admin: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_admin" className="ml-2 block text-sm text-gray-900">
                    Admin User
                  </label>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setError(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;
