import { useEffect, useState, useRef } from "react"
import Ty from "@components/typography/typography"

interface TimerBarProps {
    startTime?: Date,
    endTime?: Date,
}
export default function TimerBar({
    startTime,
    endTime,
}: TimerBarProps) {
    let progressBar = useRef(null);
    const [widthS, setWidth] = useState<string>("0");
    const [bannerFin, setBannerFin] = useState<boolean>(false);

    useEffect(() => {
        (function() {
            calcWidth()
        })()
        const interval = setInterval(calcWidth, 1000);
        return () => clearInterval(interval)
    }, [startTime, endTime])

    const calcWidth = () => {
        let timeNow = new Date()

        if (endTime) {
            let cur_dif = (new Date(endTime)).getTime() - timeNow.getTime()
            if (startTime) {
                let tot_dif = (new Date(endTime)).getTime() - (new Date(startTime)).getTime();
                let percentage = (1 - (cur_dif) / tot_dif) * 100;
                if (percentage <= 100) setWidth(`${percentage}`)
                else if (!bannerFin) setBannerFin(true)
            }
        }
    }

    return (
        <>
            <div className="flex flex-col w-full">

                {
                    bannerFin ?
                        <>
                            <div className="flex justify-center gap-2">
                                <Ty  type="h2" weight="regular"> El concurso ha terminado</Ty>
                                <Ty  type="h2" color="blue" weight="regular" clickable> ver scoreboard TODO</Ty>
                            </div>
                        </>
                        :
                        <>
                            <div className="h-5 w-full relative bg-[#D9D9D9] rounded-full" />
                            <div style={{ width: widthS + "%" }} className="relative z-3 h-5 top-[-1.25rem] bg-[#4AAE4B] rounded-full" />
                        </>
                }

            </div>
        </>
    )
}
