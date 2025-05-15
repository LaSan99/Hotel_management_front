import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function RoomList() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5050/rooms", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBook = (roomId) => {
    navigate(`/book/${roomId}`);
  };

  // Default fallback image if no image is available
  const defaultImage = "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <img
                src={(room.images && room.images.length > 0) ? room.images[0] : defaultImage}
                alt={room.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md">
                <span className="font-bold text-blue-800">${room.price}</span>
                <span className="text-gray-600 text-sm">/night</span>
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{room.title}</h4>
              <p className="text-gray-600 mb-4">{room.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">{room.type}</span>
              </div>
              <button
                onClick={() => handleBook(room._id)}
                className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList;
