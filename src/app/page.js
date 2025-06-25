'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import CategoryCard from '@/components/CategoryCard'
import { Button } from '@/components/ui/button'

const categories = [
  { label: 'Singers', value: 'Singer' },
  { label: 'Dancers', value: 'Dancer' },
  { label: 'Speakers', value: 'Speaker' },
  { label: 'DJs', value: 'DJ' }
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <section className="text-center mb-20">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight text-primary">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Artistly
            </span>
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            A platform that connects Event Planners with top Artists — from Singers to Speakers.
          </p>
          <Link href="/artists">
            <Button size="lg" className="rounded-xl shadow-md">Explore Artists</Button>
          </Link>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-3xl font-semibold text-center mb-10">Artist Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.value} href={`/artists?category=${encodeURIComponent(category.value)}`}>
                <CategoryCard title={category.label} />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
