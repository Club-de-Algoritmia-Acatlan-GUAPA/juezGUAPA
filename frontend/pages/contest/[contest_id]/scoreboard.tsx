import { useRouter } from "next/router"
import { useEffect } from "react"
import { useContest, contestGetLayout} from "@utils/LayoutContest"
import type { NextPageWithLayout } from "@pages/_app"
import Ty from "@components/typography/typography"

const Scoreboard : NextPageWithLayout = () => {
    const contestData = useContest()

    return <div>a</div>
}

Scoreboard.getLayout = contestGetLayout

export default Scoreboard