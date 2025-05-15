import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BedIcon, WifiIcon, CoffeeIcon, TvIcon, CheckIcon } from 'lucide-react';
import axios from 'axios';

export const RoomShowcase = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5050/rooms');
        setRooms(response.data);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('Failed to load rooms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleBookNow = (roomId) => {
    navigate(`/book/${roomId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <section id="rooms" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Our Rooms & Suites
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our selection of luxurious rooms and suites, each designed
            for your ultimate comfort and relaxation.
          </p>
        </div>

        {rooms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No rooms available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  {room.images && room.images.length > 0 ? (
                    <img
                      src={room.images[0]}
                      alt={room.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md">
                    <span className="font-bold text-blue-800">${room.price}</span>
                    <span className="text-gray-600 text-sm">/night</span>
                  </div>
                  {!room.is_available && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full">
                      Not Available
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {room.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{room.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <BedIcon size={16} className="text-blue-500 mr-2" />
                      {room.type}
                    </div>
                    {room.is_available && (
                      <div className="flex items-center text-gray-600">
                        <CheckIcon size={16} className="text-green-500 mr-2" />
                        Available Now
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleBookNow(room._id)}
                    disabled={!room.is_available}
                    className={`mt-6 w-full py-3 px-4 rounded-md font-medium transition duration-300 ${
                      room.is_available
                        ? 'bg-blue-800 text-white hover:bg-blue-900'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {room.is_available ? 'Book Now' : 'Not Available'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {rooms.length > 6 && (
          <div className="mt-12 text-center">
            <button 
              onClick={() => navigate('/rooms')}
              className="inline-flex items-center text-blue-800 font-medium hover:text-blue-900"
            >
              View All Rooms
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
