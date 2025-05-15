import React from 'react'
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
} from 'lucide-react'
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Grand Hotel</h3>
            <p className="text-gray-400 mb-6">
              Experience luxury and comfort in the heart of the city. Our hotel
              offers exceptional service and amenities for an unforgettable
              stay.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <TwitterIcon size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#rooms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Rooms & Suites
                </a>
              </li>
              <li>
                <a
                  href="#amenities"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Amenities
                </a>
              </li>
              <li>
                <a
                  href="#offers"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Special Offers
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Location
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPinIcon size={20} className="text-gray-400 mr-3 mt-1" />
                <span className="text-gray-400">
                  123 Luxury Avenue
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-start">
                <PhoneIcon size={20} className="text-gray-400 mr-3 mt-1" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MailIcon size={20} className="text-gray-400 mr-3 mt-1" />
                <span className="text-gray-400">info@grandhotel.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for special offers and updates.
            </p>
            <form className="mb-4">
              <div className="flex mb-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-4 py-2 rounded-r-md hover:bg-blue-900 transition-colors"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
        <hr className="border-gray-800 my-8" />
        <div className="md:flex md:items-center md:justify-between">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Grand Hotel. All rights reserved.
          </p>
          <div className="flex flex-wrap space-x-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
