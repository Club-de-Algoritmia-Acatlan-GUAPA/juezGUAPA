import Navbar from '@components/navbar/Navbar.server'
import '@styles/globals.css'

import { Suspense } from 'react'

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "@pages/api/auth/[...nextauth]"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await unstable_getServerSession(authOptions)
  return (
    <html >
      <head />
      <body>
        <div className="flex flex-col gap-3">
          <Navbar src={session?.user?.image || ''} />
          <div className="layout flex flex-col gap-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
