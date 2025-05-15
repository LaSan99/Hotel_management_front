import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import { Home } from './pages/home';
import RoomList from './components/RoomList';
import BookingForm from './components/BookingForm';
import BookingsList from './components/BookingsList';
import { Header } from './components/Header';
import AdminDashboard from './pages/adminDashboard';
import AdminRooms from './pages/adminRooms';
import AdminBooking from './pages/adminBooking';
import AdminUsers from './pages/adminUsers';
import Contact from './pages/contact';
import Profile from './pages/profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const isAdmin = localStorage.getItem("isAdmin") === 'true';

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
  };

  // Protected Route component
  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    if (adminOnly && !isAdmin) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Header onLogout={handleLogout} isAdmin={isAdmin} />
      <Routes>
        <Route path="/login" element={
          isLoggedIn ? 
          <Navigate to={isAdmin ? "/admin-dashboard" : "/"} /> : 
          <Auth onLogin={() => setIsLoggedIn(true)} />
        } />
        <Route path="/" element={
            <Home />
        } />
        <Route path="/admin-dashboard" element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/rooms" element={
          <ProtectedRoute adminOnly={true}>
            <AdminRooms />
          </ProtectedRoute>
        } />
        <Route path="/admin/bookings" element={
          <ProtectedRoute adminOnly={true}>
            <AdminBooking />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute adminOnly={true}>
            <AdminUsers />
          </ProtectedRoute>
        } />
        <Route path="/rooms" element={
          <ProtectedRoute>
            <RoomList />
          </ProtectedRoute>
        } />
        <Route path="/book/:roomId" element={
          <ProtectedRoute>
            <BookingForm />
          </ProtectedRoute>
        } />
        <Route path="/bookings" element={
          <ProtectedRoute>
            <BookingsList />
          </ProtectedRoute>
        } />
        
        {/* Profile page route */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        {/* Add contact page route */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
