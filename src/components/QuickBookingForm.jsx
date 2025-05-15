import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function QuickBookingForm({ className }) {
  const [form, setForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomType: 'any'
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to rooms page with search params
    navigate('/dashboard', { state: form });
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Book Your Stay</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
            Check-in Date
          </label>
          <input
            type="date"
            id="checkIn"
            value={form.checkIn}
            onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
            Check-out Date
          </label>
          <input
            type="date"
            id="checkOut"
            value={form.checkOut}
            onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
            Number of Guests
          </label>
          <select
            id="guests"
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
          </select>
        </div>
        <div>
          <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
            Room Type
          </label>
          <select
            id="roomType"
            value={form.roomType}
            onChange={(e) => setForm({ ...form, roomType: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="any">Any Room Type</option>
            <option value="standard">Standard Room</option>
            <option value="deluxe">Deluxe Room</option>
            <option value="suite">Suite</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-900 transition duration-300"
        >
          Check Availability
        </button>
      </form>
    </div>
  );
}

export default QuickBookingForm; 