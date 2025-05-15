import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CalendarDays, Users, CreditCard, MessageSquare, Clock, Package } from 'lucide-react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('profile');

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
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-700 border-r-2 border-b-2 border-gray-200"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg" role="alert">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <p className="text-sm text-red-700 mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-serif font-bold text-gray-900">My Account</h1>
                    <p className="text-gray-500 mt-1">Manage your profile and view your bookings</p>
                </div>
                
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-8">
                    <button 
                        className={`py-4 px-6 font-medium text-sm ${activeTab === 'profile' 
                            ? 'text-blue-700 border-b-2 border-blue-700' 
                            : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile Information
                    </button>
                    <button 
                        className={`py-4 px-6 font-medium text-sm ${activeTab === 'bookings' 
                            ? 'text-blue-700 border-b-2 border-blue-700' 
                            : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('bookings')}
                    >
                        My Bookings {bookings.length > 0 && <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{bookings.length}</span>}
                    </button>
                </div>

                {activeTab === 'profile' && (
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                        <div className="p-6 md:p-8">
                            <div className="flex items-center mb-8">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <svg className="h-8 w-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-xl font-bold text-gray-900">{user?.name || 'Guest User'}</h2>
                                    <p className="text-gray-500 text-sm">Member since {user?.created_at ? formatDate(user.created_at) : 'Recently'}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Personal Information</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Full Name</p>
                                            <p className="font-medium">{user?.name || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Email Address</p>
                                            <p className="font-medium">{user?.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                                            <p className="font-medium">{user?.phone || 'Not provided'}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Address Information</h3>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Primary Address</p>
                                        <p className="font-medium">{user?.address || 'Not provided'}</p>
                                    </div>
                                    
                                    <div className="mt-8">
                                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'bookings' && (
                    <div>
                        {bookings.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Package className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                                <p className="text-gray-500 mb-6">Explore our rooms and make your first reservation</p>
                                <Link 
                                    to="/rooms" 
                                    className="inline-block bg-blue-700 text-white py-2 px-5 rounded-md hover:bg-blue-800 transition duration-300"
                                >
                                    Browse Rooms
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {bookings.map(booking => (
                                    <div key={booking._id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
                                        <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                                            <div className="flex flex-wrap items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="bg-blue-100 p-2 rounded-md">
                                                        <CalendarDays className="h-5 w-5 text-blue-700" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <h3 className="text-lg font-medium text-gray-900">
                                                            Booking #{booking._id.substr(-6)}
                                                        </h3>
                                                        <div className="flex items-center mt-1">
                                                            <Clock className="h-4 w-4 text-gray-400" />
                                                            <p className="ml-1 text-xs text-gray-500">
                                                                Created on {booking.created_at ? formatDate(booking.created_at) : "N/A"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700 mt-2 md:mt-0">
                                                    {booking.status}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <div className="flex items-start space-x-4">
                                                        <div className="flex-shrink-0 mt-1">
                                                            <CalendarDays className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">Stay Dates</p>
                                                            <p className="text-sm text-gray-500">
                                                                {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <div className="flex items-start space-x-4">
                                                        <div className="flex-shrink-0 mt-1">
                                                            <Users className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">Guests</p>
                                                            <p className="text-sm text-gray-500">
                                                                {booking.guest_name || user?.name || "N/A"} • {booking.num_guests || 1} {booking.num_guests === 1 ? 'guest' : 'guests'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <div className="flex items-start space-x-4">
                                                        <div className="flex-shrink-0 mt-1">
                                                            <CreditCard className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">Payment</p>
                                                            <p className="text-sm text-gray-500">
                                                                {booking.payment_method || "Credit Card"} • <span className="font-medium text-blue-700">${booking.total_price || "N/A"}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {booking.special_requests && (
                                                    <div>
                                                        <div className="flex items-start space-x-4">
                                                            <div className="flex-shrink-0 mt-1">
                                                                <MessageSquare className="h-5 w-5 text-gray-400" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">Special Requests</p>
                                                                <p className="text-sm text-gray-500">
                                                                    {booking.special_requests}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                                            <p className="text-xs text-gray-500">Room Type: <span className="font-medium text-gray-900">Deluxe Suite</span></p>
                                            <Link
                                                to={`/book/${booking.room_id}`}
                                                className="inline-flex items-center py-2 px-4 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                                            >
                                                View Room
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;