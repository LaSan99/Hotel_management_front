import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/');
      return;
    }
    
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://hotel-management-back.vercel.app/admin/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Error fetching bookings. Make sure your backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`https://hotel-management-back.vercel.app/admin/bookings/${bookingId}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
      if (error.response?.status === 403) {
        setError('You do not have permission to update booking status. Admin access is required.');
      } else {
        setError('Error updating booking status. Please try again later.');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'Booked': 'bg-blue-100 text-blue-800',
      'Checked In': 'bg-green-100 text-green-800',
      'Checked Out': 'bg-gray-100 text-gray-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Bookings</h1>
          <p>Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Bookings</h1>
        
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

        {/* Bookings Table */}
        {bookings.length === 0 && !loading && !error ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">No bookings found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {booking.guest_name || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.user_email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.room_title || 'N/A'}</div>
                      <div className="text-sm text-gray-500">${booking.total_price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(booking.start_date)}
                      </div>
                      <div className="text-sm text-gray-500">
                        to {formatDate(booking.end_date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowDetailsModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Details
                      </button>
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        className="text-sm border rounded-md px-2 py-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Booked">Booked</option>
                        <option value="Checked In">Checked In</option>
                        <option value="Checked Out">Checked Out</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Booking Details Modal */}
        {showDetailsModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Guest Information</h3>
                  <p className="text-gray-600">Name: {selectedBooking.guest_name || 'N/A'}</p>
                  <p className="text-gray-600">Email: {selectedBooking.user_email}</p>
                  <p className="text-gray-600">Phone: {selectedBooking.guest_phone || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Room Details</h3>
                  <p className="text-gray-600">Room: {selectedBooking.room_title || 'N/A'}</p>
                  <p className="text-gray-600">Total Price: ${selectedBooking.total_price}</p>
                  <p className="text-gray-600">Guests: {selectedBooking.num_guests || 1}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="font-medium text-gray-900">Booking Information</h3>
                  <p className="text-gray-600">Check-in: {formatDate(selectedBooking.start_date)}</p>
                  <p className="text-gray-600">Check-out: {formatDate(selectedBooking.end_date)}</p>
                  <p className="text-gray-600">Status: {selectedBooking.status}</p>
                  {selectedBooking.special_requests && (
                    <div className="mt-2">
                      <h3 className="font-medium text-gray-900">Special Requests</h3>
                      <p className="text-gray-600">{selectedBooking.special_requests}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBooking;
