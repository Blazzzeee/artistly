'use client'

import { useState } from 'react'
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
  const [filter, setFilter] = useState({
    category: 'all',
    location: '',
  })

  const filteredArtists = artistsData.filter((artist) => {
    return (
      (filter.category === 'all' || artist.category === filter.category) &&
      (filter.location === '' ||
        artist.location.toLowerCase().includes(filter.location.toLowerCase()))
    )
  })

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Browse Artists</h1>

        {/* Filters */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-8">
          <Select
            value={filter.category}
            onValueChange={(value) => setFilter({ ...filter, category: value })}
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
            placeholder="Filter by Location"
            value={filter.location}
            onChange={(e) =>
              setFilter({ ...filter, location: e.target.value })
            }
          />

          <Button
            onClick={() =>
              setFilter({ category: 'all', location: '' })
            }
            variant="outline"
          >
            Clear Filters
          </Button>
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <Card
              key={artist.id}
              className="hover:shadow-lg transition-all"
            >
              <CardHeader>
                <CardTitle>{artist.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>Category: {artist.category}</p>
                <p>Location: {artist.location}</p>
                <p>Price: {artist.price}</p>
                <Button size="sm" className="mt-3">
                  Ask for Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
