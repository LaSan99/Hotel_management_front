import React from 'react'
import {
  WifiIcon,
  UtensilsIcon,
  DumbbellIcon,
  CarIcon,
  ShieldIcon,
  GlassWaterIcon,
  BedIcon,
} from 'lucide-react'
const amenities = [
  {
    icon: <WifiIcon size={40} className="text-blue-800" />,
    title: 'Free Wi-Fi',
    description: 'High-speed internet throughout the hotel',
  },
  {
    icon: <UtensilsIcon size={40} className="text-blue-800" />,
    title: 'Fine Dining',
    description: 'Award-winning restaurant and 24/7 room service',
  },
  {
    icon: <div size={40} className="text-blue-800" />,
    title: 'Swimming Pool',
    description: 'Indoor and outdoor pools with lounging area',
  },
  {
    icon: <DumbbellIcon size={40} className="text-blue-800" />,
    title: 'Fitness Center',
    description: 'State-of-the-art equipment and personal trainers',
  },
  {
    icon: <GlassWaterIcon size={40} className="text-blue-800" />,
    title: 'Spa & Wellness',
    description: 'Relaxing treatments and rejuvenating therapies',
  },
  {
    icon: <CarIcon size={40} className="text-blue-800" />,
    title: 'Free Parking',
    description: 'Secure underground parking for all guests',
  },
  {
    icon: <ShieldIcon size={40} className="text-blue-800" />,
    title: '24/7 Security',
    description: 'Round-the-clock security for your peace of mind',
  },
  {
    icon: <BedIcon size={40} className="text-blue-800" />,
    title: 'Premium Bedding',
    description: 'Luxury linens and pillow menu for perfect sleep',
  },
]
export const AmenitiesSection = () => {
  return (
    <section id="amenities" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Hotel Amenities & Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enjoy our comprehensive range of services and facilities designed to
            make your stay exceptional.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-blue-50 rounded-lg p-8 md:p-10">
          <div className="md:flex items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Experience Our Premium Services
              </h3>
              <p className="text-gray-600 mb-4">
                Elevate your stay with our exclusive services including airport
                transfers, concierge assistance, childcare, and more.
              </p>
              <button className="bg-blue-800 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-900 transition duration-300">
                View All Services
              </button>
            </div>
            <div className="md:w-1/3">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Premium Services"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
