import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Menu, X, Phone, LogOut, LogIn } from 'lucide-react'

export const Header = ({ onLogout, isAdmin, isLoggedIn }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  }

  const handleSignIn = () => {
    navigate('/login');
  }

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-serif font-medium text-blue-700">
              Grand Hotel
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-700 text-sm font-medium">
              Home
            </Link>
            <Link to="/rooms" className="text-gray-600 hover:text-blue-700 text-sm font-medium">
              Rooms
            </Link>
            <Link to="/#amenities" className="text-gray-600 hover:text-blue-700 text-sm font-medium">
              Amenities
            </Link>
            <Link to="/#offers" className="text-gray-600 hover:text-blue-700 text-sm font-medium">
              Offers
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-blue-700 text-sm font-medium">
              Profile
            </Link>
            {isAdmin && (
              <Link to="/admin-dashboard" className="text-blue-700 text-sm font-medium">
                Admin
              </Link>
            )}
          </nav>

          {/* Contact and Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <div className="flex items-center text-gray-600 text-sm">
              <Phone size={16} className="mr-2 text-blue-700" />
              <span>+94 77 123 4567</span>
            </div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-blue-700 text-sm"
              >
                <LogOut size={16} className="mr-1" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={handleSignIn}
                className="flex items-center bg-blue-700 text-white px-3 py-1 rounded-full text-sm"
              >
                <LogIn size={16} className="mr-1" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-blue-700"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-2 space-y-1">
            <Link to="/" className="block py-2 text-gray-600 hover:text-blue-700 text-sm">
              Home
            </Link>
            <Link to="/rooms" className="block py-2 text-gray-600 hover:text-blue-700 text-sm">
              Rooms
            </Link>
            <Link to="/#amenities" className="block py-2 text-gray-600 hover:text-blue-700 text-sm">
              Amenities
            </Link>
            <Link to="/#offers" className="block py-2 text-gray-600 hover:text-blue-700 text-sm">
              Offers
            </Link>
            <Link to="/profile" className="block py-2 text-gray-600 hover:text-blue-700 text-sm">
              Profile
            </Link>
            {isAdmin && (
              <Link to="/admin-dashboard" className="block py-2 text-blue-700 text-sm">
                Admin
              </Link>
            )}
            <div className="flex items-center text-gray-600 text-sm py-2">
              <Phone size={16} className="mr-2 text-blue-700" />
              <span>+94 77 123 4567</span>
            </div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-blue-700 text-sm py-2"
              >
                <LogOut size={16} className="mr-1" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={handleSignIn}
                className="flex items-center bg-blue-700 text-white px-3 py-1 rounded-full text-sm mt-2"
              >
                <LogIn size={16} className="mr-1" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}