import { Suspense } from 'react'
import ArtistListingPage from '@/components/ArtistListingPage'

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ArtistListingPage />
    </Suspense>
  )
}
