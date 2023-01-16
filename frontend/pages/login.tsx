import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Ty from "@components/typography/typography";
export default function Login() {

    const { data: session, status }: any = useSession()
    let r = useRouter();
    if (status === "authenticated") {
        //return <p>Signed in as {session.user.email}</p>
        
        r.push("/")
    }

    return <Ty type="h2" clickable href="/api/auth/signin" >Sign in</Ty>
}
