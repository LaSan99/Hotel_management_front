import React from 'react'
import { QuickBookingForm } from './QuickBookingForm'

export const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      {/* Hero background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundPosition: 'center 30%',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-20 md:py-32 flex flex-col md:flex-row items-center">
          {/* Hero content */}
          <div className="w-full md:w-3/5 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Experience Luxury & Comfort
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl">
              Discover our exquisite rooms and exceptional service for an
              unforgettable stay in the heart of the city.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-md font-medium transition duration-300">
                Explore Rooms
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-md font-medium transition duration-300">
                View Offers
              </button>
            </div>
          </div>
          {/* Booking form */}
          <div className="w-full md:w-2/5">
            <QuickBookingForm className="md:ml-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
