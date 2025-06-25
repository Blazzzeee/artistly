'use client'

import ArtistForm from '@/components/ArtistForm'
import Navbar from '@/components/Navbar'

export default function OnboardPage() {
  return (
    <>
      <Navbar />
      <div className="py-12 px-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Artist Onboarding</h1>
        <ArtistForm />
      </div>
    </>
  )
}
