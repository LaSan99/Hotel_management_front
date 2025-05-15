import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch user profile
                const userResponse = await axios.get('https://hotel-management-back.vercel.app/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(userResponse.data);

                // Fetch bookings
                const bookingsResponse = await axios.get("https://hotel-management-back.vercel.app/bookings", {
                    headers: { 
                        'Authorization': `Bearer ${token}` 
                    }
                });
                setBookings(bookingsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.response?.data?.error || "An error occurred while fetching data");
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    // Function to format dates in a readable way
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 gap-6">
                {/* Profile Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Profile Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Name</p>
                            <p className="font-medium">{user?.name || 'Not provided'}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Email</p>
                            <p className="font-medium">{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Phone</p>
                            <p className="font-medium">{user?.phone || 'Not provided'}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Address</p>
                            <p className="font-medium">{user?.address || 'Not provided'}</p>
                        </div>
                    </div>
                </div>

                {/* Bookings Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">My Bookings</h2>
                    {bookings.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600 mb-4">You don't have any bookings yet.</p>
                            <Link 
                                to="/rooms" 
                                className="inline-block bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition duration-300"
                            >
                                Browse Rooms
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {bookings.map(booking => (
                                <div key={booking._id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                                    <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            Booking #{booking._id.substr(-6)}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
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
                                                <dd className="mt-1">
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
