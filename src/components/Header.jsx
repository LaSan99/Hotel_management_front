import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MenuIcon, XIcon, PhoneIcon, LogOutIcon } from 'lucide-react'

export const Header = ({ onLogout, isAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-serif font-bold text-blue-800">
              Grand Hotel
            </h1>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-800 px-3 py-2 font-medium"
            >
              Home
            </Link>
            <Link
              to="/rooms"
              className="text-gray-700 hover:text-blue-800 px-3 py-2 font-medium"
            >
              Rooms
            </Link>
            <Link
              to="/#amenities"
              className="text-gray-700 hover:text-blue-800 px-3 py-2 font-medium"
            >
              Amenities
            </Link>
            <Link
              to="/#offers"
              className="text-gray-700 hover:text-blue-800 px-3 py-2 font-medium"
            >
              Special Offers
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-800 px-3 py-2 font-medium"
            >
              Profile
            </Link>
            {isAdmin && (
              <Link
                to="/admin-dashboard"
                className="text-blue-800 hover:text-blue-900 px-3 py-2 font-medium"
              >
                Admin Dashboard
              </Link>
            )}
          </nav>
          {/* Contact and Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-blue-800">
              <PhoneIcon size={18} className="mr-2" />
              <span className="font-medium">+1 (555) 123-4567</span>
            </div>
            {/* <button 
              onClick={() => navigate('/dashboard')}
              className="bg-blue-800 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-900 transition duration-300"
            >
              Dashboard
            </button> */}
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-700 hover:text-blue-800 px-3 py-2 font-medium"
            >
              <LogOutIcon size={18} className="mr-2" />
              Logout
            </button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-800"
            >
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-blue-800 font-medium"
            >
              Home
            </Link>
            <Link
              to="/rooms"
              className="block px-3 py-2 text-gray-700 hover:text-blue-800 font-medium"
            >
              Rooms
            </Link>
            <Link
              to="/#amenities"
              className="block px-3 py-2 text-gray-700 hover:text-blue-800 font-medium"
            >
              Amenities
            </Link>
            <Link
              to="/#offers"
              className="block px-3 py-2 text-gray-700 hover:text-blue-800 font-medium"
            >
              Special Offers
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 text-gray-700 hover:text-blue-800 font-medium"
            >
              Profile
            </Link>
            {isAdmin && (
              <Link
                to="/admin-dashboard"
                className="block px-3 py-2 text-blue-800 hover:text-blue-900 font-medium"
              >
                Admin Dashboard
              </Link>
            )}
            <div className="flex items-center text-blue-800 px-3 py-2">
              <PhoneIcon size={18} className="mr-2" />
              <span className="font-medium">+1 (555) 123-4567</span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-gray-700 hover:text-blue-800 font-medium"
            >
              <LogOutIcon size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
