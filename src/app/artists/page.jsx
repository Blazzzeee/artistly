'use client'

import { useState } from 'react'
import artistsData from '@/data/artists.json'
import Navbar from '@/components/Navbar'
import FilterBlock from '@/components/FilterBlock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ArtistListingPage() {
  const [filter, setFilter] = useState({
    category: 'all',
    location: '',
    priceMin: '',
    priceMax: '',
  })

  const filteredArtists = artistsData.filter((artist) => {
    const matchesCategory =
      filter.category === 'all' || artist.category === filter.category

    const matchesLocation =
      filter.location === '' ||
      artist.location.toLowerCase().includes(filter.location.toLowerCase())

    const min = parseFloat(filter.priceMin)
    const max = parseFloat(filter.priceMax)

    const matchesPrice =
      (isNaN(min) || artist.priceMax >= min) &&
      (isNaN(max) || artist.priceMin <= max)

    return matchesCategory && matchesLocation && matchesPrice
  })

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Browse Artists</h1>

        {/* Reusable FilterBlock */}
        <FilterBlock
          filter={filter}
          setFilter={setFilter}
          onClear={() =>
            setFilter({
              category: 'all',
              location: '',
              priceMin: '',
              priceMax: '',
            })
          }
        />

        {/* Artist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist) => (
              <Card key={artist.id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>{artist.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-muted-foreground">
                  <p>Category: {artist.category}</p>
                  <p>Location: {artist.location}</p>
                  <p>
                    Price: ₹
                    {artist.priceMin.toLocaleString()} - ₹
                    {artist.priceMax.toLocaleString()}
                  </p>
                  <Button size="sm" className="mt-3">
                    Ask for Quote
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground col-span-full">
              No matching artists found.
            </p>
          )}
        </div>
      </div>
    </>
  )
}
