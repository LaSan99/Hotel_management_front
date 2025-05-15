import React from 'react'
import { HeroSection } from '../components/HeroSection'
import { RoomShowcase } from '../components/RoomShowcase'
import { AmenitiesSection } from '../components/AmenitiesSection'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { SpecialOffersSection } from '../components/SpecialOffersSection'
import { LocationSection } from '../components/LocationSection'
import { Footer } from '../components/Footer'

export function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <main className="flex-1">
        <HeroSection />
        <RoomShowcase />
        <AmenitiesSection />
        <TestimonialsSection />
        <SpecialOffersSection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  )
}
export default Home
