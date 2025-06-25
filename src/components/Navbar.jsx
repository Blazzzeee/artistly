'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Navbar() {
  return (
    <header className="w-full border-b bg-background px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          Artistly
        </Link>

        <nav className="flex flex-wrap gap-2">
          <Link
            href="/about"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
          >
            About
          </Link>
          <Link
            href="/artists"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Browse Artists
          </Link>
          <Link
            href="/onboard"
            className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
          >
            Onboard Artist
          </Link>
        </nav>
      </div>
    </header>
  )
}
