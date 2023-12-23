"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from 'next/image'

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/logo.png"
          alt="Next.js Logo"
          width={30}
          height={37}
          priority
        />
        <span className="hidden font-bold sm:inline-block text-red-500 text-xl">
          Oracle
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium ">
        <Link
          href="/txs"
          className="text-white"
        >
          Transactions
        </Link>
        <Link
          href="/bones"
          className="text-white"
        >
          Bones
        </Link>
        <Link
          href="/market"
          className="text-white"
        >
          Market
        </Link>
        <Link
          href="/inscribe"
          className="text-white"
        >
          Inscribe
        </Link>
      </nav>
    </div>
  )
}
