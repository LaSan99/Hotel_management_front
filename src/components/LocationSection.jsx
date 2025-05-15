import React from 'react'
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  ExternalLinkIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
export const LocationSection = () => {
  return (
    <section id="location" className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Location & Contact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Perfectly situated in the heart of the city, with easy access to
            major attractions and transportation.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Map placeholder - in a real implementation, you would use a proper map API */}
            <div className="h-96 bg-blue-100 relative">
              <img
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2231&q=80"
                alt="Hotel Location Map"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4">
                <button className="bg-white text-blue-800 px-3 py-2 rounded-md font-medium shadow-md flex items-center">
                  <ExternalLinkIcon size={18} className="mr-2" />
                  View Larger Map
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 h-full">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPinIcon
                    size={24}
                    className="text-blue-800 mr-4 mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600">
                      123 Luxury Avenue
                      <br />
                      Downtown District
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <PhoneIcon
                    size={24}
                    className="text-blue-800 mr-4 mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">
                      Reservations: +1 (555) 123-4567
                      <br />
                      Front Desk: +1 (555) 123-4568
                      <br />
                      Customer Service: +1 (555) 123-4569
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MailIcon
                    size={24}
                    className="text-blue-800 mr-4 mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">
                      Reservations: reservations@grandhotel.com
                      <br />
                      General Inquiries: info@grandhotel.com
                      <br />
                      Customer Service: support@grandhotel.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ClockIcon
                    size={24}
                    className="text-blue-800 mr-4 mt-1 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Hours</h4>
                    <p className="text-gray-600">
                      Check-in: 3:00 PM
                      <br />
                      Check-out: 12:00 PM
                      <br />
                      Front Desk: 24/7
                    </p>
                  </div>
                </div>
              </div>
              <Link 
                to="/contact"
                className="mt-8 w-full bg-blue-800 text-white py-3 rounded-md font-medium hover:bg-blue-900 transition duration-300 text-center block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
