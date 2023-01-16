import "../styles/globals.css"
import type { AppProps } from "next/app"
import type { ReactElement, ReactNode } from "react"
import type { NextPage } from "next"

import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/router"
import Navbar from "@components/navbar/Navbar.client"


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {

  const getLayout = Component.getLayout ?? ((page: any) => page)

  const router = useRouter()

  return <>
    <div className="flex flex-col gap-[20px]">
      <SessionProvider session={session}>
        <Navbar />
        {
          getLayout(
            <>
              <Component key={router.asPath} {...pageProps} />
            </>
          )
        }
      </SessionProvider>
    </div>
  </>
}
