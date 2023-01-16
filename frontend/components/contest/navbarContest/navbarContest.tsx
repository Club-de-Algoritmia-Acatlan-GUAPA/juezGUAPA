import Ty from "@components/typography/typography"
import { useRouter } from "next/router";
import { useContest  } from "@utils/LayoutContest"
import type { Contest , ContestContextType} from "@utils/types"

export enum CONTEST_OPTIONS {
    "Problemas" = "problems",
    "Scoreboard" = "scoreboard",
    "Concurso" = "concurso",
    "Submits" = "submits",
    "Aclaraciones" = "acla"
}

interface NavbarContestProps {
    contestId?: string,
    selectedTab?: CONTEST_OPTIONS
}

export function NavbarContest({
    selectedTab,
}: NavbarContestProps) {
    const r = useRouter()
    const slugTab = r.asPath.split('/').slice(-1)[0]
    const contestData = useContest()
    return (
        <>
            <div className="flex gap-7 items-center">
                {
                    Object.keys(CONTEST_OPTIONS).map(elem => {
                        let value = (CONTEST_OPTIONS as any)[elem];
                        return (
                        <Ty 
                            key={value}
                            className={value === slugTab ? "selected" : ""}
                            type="h3"
                            weight="bold"
                            clickable
                            color = {value === slugTab  ? "blue" : "black"}
                            href={`/contest/${contestData?.id}/${value}`}
                        >{elem}</Ty>
                    )})
                }
            </div>
        </>
    )
}