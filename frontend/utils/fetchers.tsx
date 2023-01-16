import { useSession } from "next-auth/react"
import Router from "next/router"
import { NextFetchEvent } from "next/server"

interface getUserProps{
    redirect?:string,
}

export function getUser({
    redirect = "/login"
}:getUserProps) {

  const { data: session, status }: any = useSession()

  if (status !== "authenticated") {
    Router.push(redirect)
  }
  return session
}

export async function getContestGeneralInfo( id : string) {
  let req = await fetch(`/api/contest?=${id}`)
  let data = await req.json()
  return data
}

export const multifetcher = (urls : string[]) => {
  const f = (url: string) => fetch(url).then(r => r.json())
  console.log(Promise.all(urls.map(f)))
  return Promise.all(urls.map(f))
}

export const fetcher = (url :string) => fetch(url).then(r => r.json())
