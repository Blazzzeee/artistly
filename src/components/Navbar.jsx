'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Navbar() {
  return (
    <header className="w-full border-b py-4 px-6 flex justify-between items-center bg-background">
      <Link href="/" className="text-2xl font-bold text-primary">
        Artistly
      </Link>
      <nav className="space-x-4">
        <Link href="/about" className={cn(buttonVariants({ variant: 'ghost' }))}>
          About
        </Link>
        <Link href="/artists" className={cn(buttonVariants({ variant: 'outline' }))}>
          Browse Artists
        </Link>
        <Link href="/onboard" className={cn(buttonVariants({ variant: 'default' }))}>
          Onboard Artist
        </Link>
      </nav>
    </header>
  )
}
