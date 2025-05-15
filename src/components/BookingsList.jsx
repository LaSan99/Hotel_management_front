import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://hotel-management-back.vercel.app/bookings", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Function to format dates in a readable way
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-600 mb-4">You don't have any bookings yet.</p>
          <Link 
            to="/rooms" 
            className="inline-block bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition duration-300"
          >
            Browse Rooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map(booking => (
          <div key={booking._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Booking #{booking._id.substr(-6)}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Created on {booking.created_at ? formatDate(booking.created_at) : "N/A"}
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Check-in</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDate(booking.start_date)}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Check-out</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDate(booking.end_date)}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Guest Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{booking.guest_name || "N/A"}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Number of Guests</dt>
                  <dd className="mt-1 text-sm text-gray-900">{booking.num_guests || 1}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {booking.status}
                    </span>
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Special Requests</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {booking.special_requests || "None"}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                  <dd className="mt-1 text-sm text-gray-900">{booking.payment_method || "Credit Card"}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Total Price</dt>
                  <dd className="mt-1 text-lg font-bold text-blue-800">${booking.total_price || "N/A"}</dd>
                </div>
              </dl>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <Link
                to={`/book/${booking.room_id}`}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Room
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingsList; 