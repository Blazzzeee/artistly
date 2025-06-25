'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import artistsData from '@/data/artists.json'
import Navbar from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

export default function ArtistListingPage() {
  const searchParams = useSearchParams()

  const [filter, setFilter] = useState({
    category: 'all',
    location: '',
    priceMin: '',
    priceMax: '',
  })

  useEffect(() => {
    const categoryFromURL = searchParams.get('category')
    if (categoryFromURL) {
      setFilter((prev) => ({ ...prev, category: categoryFromURL }))
    }
  }, [searchParams])

  const filteredArtists = artistsData.filter((artist) => {
    const min = parseFloat(filter.priceMin)
    const max = parseFloat(filter.priceMax)

    const matchesCategory =
      filter.category === 'all' || artist.category === filter.category

    const matchesLocation =
      filter.location === '' ||
      artist.location.toLowerCase().includes(filter.location.toLowerCase())

    const matchesPrice =
      (isNaN(min) || artist.priceMin >= min) &&
      (isNaN(max) || artist.priceMax <= max)

    return matchesCategory && matchesLocation && matchesPrice
  })

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Browse Artists</h1>

        {/* Filter UI */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-5 mb-8">
          <Select
            value={filter.category}
            onValueChange={(value) =>
              setFilter({ ...filter, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Singer">Singer</SelectItem>
              <SelectItem value="Dancer">Dancer</SelectItem>
              <SelectItem value="Speaker">Speaker</SelectItem>
              <SelectItem value="DJ">DJ</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Location"
            value={filter.location}
            onChange={(e) =>
              setFilter({ ...filter, location: e.target.value })
            }
          />

          <Input
            type="number"
            placeholder="Min Price"
            value={filter.priceMin}
            onChange={(e) =>
              setFilter({ ...filter, priceMin: e.target.value })
            }
          />

          <Input
            type="number"
            placeholder="Max Price"
            value={filter.priceMax}
            onChange={(e) =>
              setFilter({ ...filter, priceMax: e.target.value })
            }
          />

          <Button
            variant="outline"
            onClick={() =>
              setFilter({
                category: 'all',
                location: '',
                priceMin: '',
                priceMax: '',
              })
            }
          >
            Clear
          </Button>
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist) => (
              <Card key={artist.id} className="hover:shadow-lg transition-all">
                <CardHeader className="p-0">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground p-4">
                  <h3 className="text-lg font-semibold text-primary">{artist.name}</h3>
                  <p>Category: {artist.category}</p>
                  <p>Location: {artist.location}</p>
                  <p>
                    Price:{' '}
                    {typeof artist.priceMin === 'number' && typeof artist.priceMax === 'number'
                      ? `₹${artist.priceMin.toLocaleString()} - ₹${artist.priceMax.toLocaleString()}`
                      : 'Not available'}
                  </p>
                  <Button size="sm" className="mt-2">
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
