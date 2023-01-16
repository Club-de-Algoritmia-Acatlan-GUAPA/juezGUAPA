import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Navbar from "../components/navbar/Navbar.client"


export default function Home() {
  const { data: session, status }: any = useSession()

  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>
  }
  return <h1>a</h1>
}
