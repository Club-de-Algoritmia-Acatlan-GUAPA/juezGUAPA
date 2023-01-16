"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Ty from "../typography/typography"
import style from "./Navbar.module.css"


interface NavbarServerProps {
    src: string,
}
export default function Navbar({ src = "" }: NavbarServerProps) {

    return (
        <div className={style.navbar}>
            <Ty type="h1" font="inter" href="/" color="blue" clickable >
                Juez GUAPA
            </Ty>
            <div className={style.childsContainer}>
                <Ty type="h3" clickable>
                    Problemas
                </Ty>
                <Ty type="h3" font="inter">
                    Concursos
                </Ty>
                <Ty type="h3" font="inter">
                    Blog
                </Ty>
                <Ty type="h3" font="inter" onClick={signOut} clickable>
                    Log Out
                </Ty>
                {
                    src
                        ? <img src={src} style={{ width: "44px", height: "44px", borderRadius: "50%", background: "gray" }} />
                        : <Ty type="h3" font="inter" onClick={signIn} clickable> Sign In </Ty>
                }
            </div>
        </div>
    )
}
