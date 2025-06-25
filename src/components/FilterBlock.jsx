'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

export default function FilterBlock({ filter, setFilter, onClear }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-5 mb-8">
      {/* Category Filter */}
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

      {/* Location Filter */}
      <Input
        placeholder="Location"
        value={filter.location}
        onChange={(e) => setFilter({ ...filter, location: e.target.value })}
      />

      {/* Min Price */}
      <Input
        type="number"
        placeholder="Min Price"
        value={filter.priceMin}
        onChange={(e) => setFilter({ ...filter, priceMin: e.target.value })}
      />

      {/* Max Price */}
      <Input
        type="number"
        placeholder="Max Price"
        value={filter.priceMax}
        onChange={(e) => setFilter({ ...filter, priceMax: e.target.value })}
      />

      {/* Clear Button */}
      <Button variant="outline" onClick={onClear}>
        Clear
      </Button>
    </div>
  )
}
