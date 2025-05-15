import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: 'standard',
    images: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/');
      return;
    }
    
    fetchRooms();
  }, [navigate]);

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://hotel-management-back.vercel.app/rooms', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Error fetching rooms. Make sure your backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const token = localStorage.getItem('token');
    try {
      if (editingRoom) {
        await axios.put(`https://hotel-management-back.vercel.app/rooms/${editingRoom._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('https://hotel-management-back.vercel.app/rooms', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchRooms();
      setShowAddModal(false);
      setEditingRoom(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        type: 'standard',
        images: []
      });
    } catch (error) {
      console.error('Error saving room:', error);
      if (error.response?.status === 403) {
        setError('You do not have permission to perform this action. Admin access is required.');
      } else {
        setError('Error saving room. Please check your connection and try again.');
      }
    }
  };

  const handleDelete = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://hotel-management-back.vercel.app/rooms/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchRooms();
      } catch (error) {
        console.error('Error deleting room:', error);
        if (error.response?.data?.error) {
          setError(error.response.data.error);
        } else if (error.response?.status === 403) {
          setError('You do not have permission to delete this room. Admin access is required.');
        } else {
          setError('Error deleting room. Please try again later.');
        }
      }
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      title: room.title,
      description: room.description,
      price: room.price,
      type: room.type,
      images: room.images || []
    });
    setShowAddModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Rooms</h1>
          <p>Loading rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Rooms</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900"
          >
            Add New Room
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

        {/* Room List */}
        {rooms.length === 0 && !loading && !error ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 mb-4">No rooms found. Add a new room to get started.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900"
            >
              Add New Room
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={room.images[0] || 'https://via.placeholder.com/400x200?text=No+Image'}
                  alt={room.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/400x200?text=Image+Error';
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{room.title}</h3>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-800">${room.price}/night</span>
                    <span className="text-gray-500 capitalize">{room.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleEdit(room)}
                      className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="bg-red-100 text-red-800 px-4 py-2 rounded-md hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Room Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6">
                {editingRoom ? 'Edit Room' : 'Add New Room'}
              </h2>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price per Night
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.images[0] || ''}
                    onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingRoom(null);
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
                    {editingRoom ? 'Save Changes' : 'Add Room'}
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

export default AdminRooms;
