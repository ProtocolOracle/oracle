import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { buttonVariants } from "@/components/ui/button"
import { ConnectWallet } from "@/components/ThirdwebProvider"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Link
              href=""
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.twitter className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            
            <ConnectWallet modalSize="compact" theme='dark' switchToActiveChain={true} />
          </nav>
        </div>
      </div>
    </header>
  )
}
