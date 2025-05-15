import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BookingForm() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    guest_name: "",
    guest_phone: "",
    num_guests: 1,
    special_requests: "",
    payment_method: "Credit Card"
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch room details
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`https://hotel-management-back.vercel.app/rooms/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRoom(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching room details:", err);
        alert("Error loading room details");
        navigate('/rooms');
      }
    };
    
    fetchRoom();
  }, [roomId, token, navigate]);

  // Calculate total price when dates change
  useEffect(() => {
    if (room && form.start_date && form.end_date) {
      const start = new Date(form.start_date);
      const end = new Date(form.end_date);
      const days = Math.max(1, Math.floor((end - start) / (1000 * 60 * 60 * 24)));
      setTotalPrice(days * room.price);
    }
  }, [form.start_date, form.end_date, room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate dates
    const start = new Date(form.start_date);
    const end = new Date(form.end_date);
    if (end <= start) {
      alert("Check-out date must be after check-in date");
      return;
    }

    // Format dates in YYYY-MM-DD format
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };

    // Ensure num_guests is a number
    const numGuests = parseInt(form.num_guests, 10) || 1;

    const bookingData = {
      room_id: roomId,
      start_date: formatDate(start),
      end_date: formatDate(end),
      guest_name: form.guest_name.trim(),
      guest_phone: form.guest_phone.trim(),
      num_guests: numGuests,
      special_requests: form.special_requests?.trim() || "",
      payment_method: form.payment_method || "Credit Card"
    };

    // Validate required fields
    const requiredFields = ['room_id', 'start_date', 'end_date', 'guest_name', 'guest_phone'];
    const missingFields = requiredFields.filter(field => !bookingData[field]);
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    console.log("Sending booking data:", bookingData);
    
    try {
      const response = await axios.post("https://hotel-management-back.vercel.app/book", bookingData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Booking response:", response.data);
      alert(`Booking successful! Total: $${response.data.total_price}`);
      navigate('/rooms');
    } catch (err) {
      console.error("Booking error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.message || 
                          "Booking failed. Please try again.";
      alert(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p>Loading room details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {room.images && room.images.length > 0 && (
          <div className="h-64 overflow-hidden">
            <img 
              src={room.images[0]} 
              alt={room.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{room.title}</h2>
            <p className="text-gray-600 mb-2">{room.description}</p>
            <div className="flex items-center">
              <span className="text-lg font-bold text-blue-800">${room.price}</span>
              <span className="text-sm text-gray-600 ml-1">/night</span>
              <span className="ml-4 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">{room.type}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                  Check-in Date
                </label>
                <input
                  type="date"
                  id="start_date"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                  Check-out Date
                </label>
                <input
                  type="date"
                  id="end_date"
                  value={form.end_date}
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                  min={form.start_date || new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="guest_name" className="block text-sm font-medium text-gray-700">
                Guest Name
              </label>
              <input
                type="text"
                id="guest_name"
                value={form.guest_name}
                onChange={(e) => setForm({ ...form, guest_name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="guest_phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="guest_phone"
                  value={form.guest_phone}
                  onChange={(e) => setForm({ ...form, guest_phone: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="num_guests" className="block text-sm font-medium text-gray-700">
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="num_guests"
                  min="1"
                  max="10"
                  value={form.num_guests}
                  onChange={(e) => setForm({ ...form, num_guests: parseInt(e.target.value) })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="special_requests" className="block text-sm font-medium text-gray-700">
                Special Requests
              </label>
              <textarea
                id="special_requests"
                value={form.special_requests}
                onChange={(e) => setForm({ ...form, special_requests: e.target.value })}
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                id="payment_method"
                value={form.payment_method}
                onChange={(e) => setForm({ ...form, payment_method: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Pay at Hotel">Pay at Hotel</option>
              </select>
            </div>
            
            {totalPrice > 0 && (
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Total Price:</span>
                  <span className="text-xl font-bold text-blue-800">${totalPrice}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {form.start_date && form.end_date ? 
                    `For ${Math.max(1, Math.floor((new Date(form.end_date) - new Date(form.start_date)) / (1000 * 60 * 60 * 24)))} nights` : 
                    "Please select dates"}
                </p>
              </div>
            )}
            
            <div className="flex space-x-4 pt-2">
              <button
                type="submit"
                className="flex-1 bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition duration-300"
              >
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={() => navigate('/rooms')}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
