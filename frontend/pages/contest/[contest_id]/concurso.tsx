import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import TimerBanner from "@components/contest/timer/timerBanner"
import { getContestGeneralInfo } from "../../../utils/fetchers"
import type { Contest } from "@utils/types"
import Navbar from "@components/navbar/Navbar.client"
import { CONTEST_OPTIONS, NavbarContest } from "@components/contest/navbarContest/navbarContest"
import Card from "@components/card/Cards"
import LayoutContest, { useContest, contestGetLayout } from "@utils/LayoutContest"
import type { NextPageWithLayout } from "@pages/_app"

const Concurso: NextPageWithLayout = () => {
    const router = useRouter()
    const {contest_id} = router.query
    const { data: session, status }: any = useSession()
    const contestData = useContest()

    if (status === "unauthenticated") {
        return <div>logeate</div>
    }

    if (status === "loading") {
        return <div>Loading</div>
    }

    return (
        <>
            <div className="flex flex-col bg-[#E7EBEF] p-[20px] rounded-[10px] gap-[5px]">
                <TimerBanner
                    name={contestData?.name ?? ""}
                    startTime={contestData?.startTime}
                    endTime={contestData?.endTime}
                />
            </div>
            {
                contestData?.bases?.map(({ title, content }) => {
                    return <Card key={title} title={title} content={content} />
                })
            }
        </>
    )
}

Concurso.getLayout = contestGetLayout

export default Concurso