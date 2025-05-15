import React from 'react'
import { CalendarIcon, PercentIcon, TagIcon } from 'lucide-react'

const offers = [
  {
    id: 1,
    title: 'Early Bird Special',
    discount: '20% Off',
    description: 'Book at least 30 days in advance and save 20% on your stay',
    validUntil: 'December 31, 2023',
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    color: 'bg-blue-800',
  },
  {
    id: 2,
    title: 'Weekend Getaway',
    discount: 'Free Breakfast',
    description:
      'Stay for the weekend and enjoy complimentary breakfast for two',
    validUntil: 'Ongoing',
    image:
      'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    color: 'bg-green-700',
  },
  {
    id: 3,
    title: 'Extended Stay',
    discount: '25% Off',
    description: 'Save 25% when you book a stay of 5 nights or more',
    validUntil: 'November 30, 2023',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    color: 'bg-purple-700',
  },
]

export const SpecialOffersSection = () => {
  return (
    <section id="offers" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Special Offers & Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take advantage of our exclusive deals and special packages to make your
            stay even more memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute top-4 right-4 ${offer.color} text-white px-4 py-2 rounded-full`}
                >
                  {offer.discount}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>

                <div className="flex items-center text-gray-500 text-sm mb-6">
                  <CalendarIcon size={16} className="mr-2" />
                  Valid until: {offer.validUntil}
                </div>

                <button className="w-full bg-blue-800 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-900 transition duration-300">
                  Book This Offer
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center text-blue-800 font-medium hover:text-blue-900">
            View All Offers
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
