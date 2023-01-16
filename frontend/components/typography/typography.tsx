import { Lato, Inter } from "@next/font/google"
import type { ReactNode } from "react"
import Link from "next/link"

interface TProps {
    font?: "inter" | "lato",
    type: string,
    weight?: "light" | "regular" | "bold" | "black",
    href?: string,
    color?: "blue" | "green" | "black" | "white" | "red",
    children: ReactNode,
    clickable?: boolean,
    light?: boolean,
    onClick?: () => any,
    style?: any,
    className?: string,
}

const colorPick = {
    green: "#4BD37B",
    blue: "#0076ED",
    black: "#000",
    white: "#fff",
    red : "#ef4643"
}

const weightPick = {
    "light": 300,
    "regular": 500,
    "bold": 700,
    "black": 900,
}

export default function Ty({
    type,
    href,
    color = "black",
    weight = "regular",
    font = "inter",
    children,
    style = {},
    className = "",
    clickable = false,
    onClick = undefined,
}: TProps) {
    let node;
    switch (type) {
        case "h1":
            node = (<h1
                className={className}
                style={{
                    ...{
                        fontSize: "30px",
                        fontWeight: "900",
                        color: `${colorPick[color]}`
                    }, ...style
                }}>{children}</h1>)
            break;

        case "h2":
            node = <h2
                className={className}
                style={{
                    ...{
                        fontSize: "20px",
                        fontWeight: `${weightPick[weight]}`,
                        color: `${colorPick[color]}`
                    }, ...style
                }}>{children}</h2>
            break;

        case "h3":
            node = <h3
                className={className}
                style={{
                    ...{
                        fontSize: "15px",
                        fontWeight: `${weightPick[weight]}`,
                        color: `${colorPick[color]}`
                    }, ...style
                }}>{children}</h3>
            break;

        case "subtitle":
            node = <h1 style={{
                fontSize: "33px",
                fontWeight: "900",
                color: `${colorPick[color]}`
            }}>{children}</h1>
            break;
        default:
            node = <h1>k</h1>
    }
    if (!clickable) return node

    if (onClick) {
        return <a style={{ cursor: "pointer" }} onClick={() => onClick()}>{node}</a>
    }
    return (
        <Link href={`${href}`} >
            {/*style={{ textDecoration: "none" }}>*/}
            {node}
        </Link>
    );
}