import React, { useState } from "react";
import axios from "axios";

function BookingHistory() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    axios.get(`http://localhost:5050/bookings?email=${email}`)
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Booking History</h2>
      <input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={fetchBookings}>Check</button>
      {bookings.map(b => (
        <div key={b._id} style={{ border: "1px solid gray", marginTop: "10px", padding: "10px" }}>
          <p>Room ID: {b.room_id}</p>
          <p>From: {b.start_date} To: {b.end_date}</p>
          <p>Status: {b.status}</p>
        </div>
      ))}
    </div>
  );
}

export default BookingHistory;
