import { useSession } from "next-auth/react"
import Router, { useRouter } from "next/router"
import { useEffect, useState } from "react"
import type { Contest } from "../../../utils/types"
import Ty from "../../typography/typography"
import styles from "./timer.module.css"
import TimerBar from "./timerBar"

interface TimerBannerProps {
    name: string,
    startTime?: Date,
    endTime?: Date,
}
export default function TimerBanner({
    name,
    startTime,
    endTime,
}: TimerBannerProps) {

    function getDate(time: Date | undefined) {
        if (!time) return "";
        return time.toString()
    }
    function getRemainingTime(time: Date | undefined) {
        return "TODO";
    }

    function getElapsedTime(time: Date | undefined) {
        return "TODO";
    }
    return (
        <>
            <div className="flex flex-col w-full items-center">
                <Ty type="h1" weight="regular" >{name}</Ty>
                <div className="flex justify-between w-full">
                    <div className="flex gap-4">
                        <Ty type="h2" weight="light">Inicio : </Ty>
                        <Ty type="h2" >{getDate(startTime)}</Ty>
                    </div>
                    <div className="flex gap-4">
                        <Ty type="h2" weight="light">Final : </Ty>
                        <Ty type="h2" >{getDate(endTime)}</Ty>
                    </div>
                </div>
                <TimerBar
                    startTime={startTime}
                    endTime={endTime}
                />
                <div className="flex justify-between w-full">
                    <div className="flex gap-4">
                        <Ty type="h2" weight="light">Tiempo transcurrido : </Ty>
                        <Ty type="h2" > {getElapsedTime(startTime)}</Ty>
                    </div>
                    <div className="flex gap-4">
                        <Ty type="h2" weight="light">Tiempo restante : </Ty>
                        <Ty type="h2" >{getRemainingTime(endTime)}</Ty>
                    </div>
                </div>
            </div>
        </>
    )
}
