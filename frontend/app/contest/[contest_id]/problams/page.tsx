"use client"

import type { NextPageWithLayout } from "@pages/_app"
import type { ContestProblems, ProblemInfo } from "@utils/types"
import Ty from "@components/typography/typography"
import { NavbarContest, CONTEST_OPTIONS } from "@components/contest/navbarContest/navbarContest"
import useSWR  from "swr"

// async function getContestProblems(contestId: string) {
//     const HOST = process.env.HOST || 'http://localhost:3000'
//     console.log('getContestProblems',HOST)
//     const res = await fetch(`http://localhost:3000/api/contest/${contestId}/problems`)
//     return res.json()
// }

const ABC : string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function Page({ params: { contest_id } }: any) {

    const { data, error, isLoading } = useSWR<ContestProblems>(`/api/contest/${contest_id}/problems`)
    
    // if (!problemsInfo || !contestName) {
    //     return <Ty type="h1" weight="black" > Oops {":("} Data of the problems wasn't found</Ty>
    // }
    if(isLoading) {
        return <div>Loading...</div>
    }
    
    if(error) {
        return <div>Something went wrong</div>
    }
    return (
        <>
            <NavbarContest />
            <table className="table">
                <thead>
                    <tr>
                        <th >
                            <Ty type="h2" weight="bold">#</Ty>
                        </th>
                        <th >
                            <Ty type="h2" weight="bold">Name</Ty>
                        </th>
                        <th >
                            <Ty type="h2" weight="bold">Autor</Ty>
                        </th>
                        <th >
                            <Ty type="h2" weight="bold">Submit</Ty>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.problemsInfo.map(({ id, name, author, slug }: ProblemInfo, idx: number) => {
                            return <>
                                <tr>
                                    <td>
                                        <Ty type="h3">{ABC.charAt(idx)}</Ty>
                                    </td>
                                    <td>
                                        <Ty type="h3">{name}</Ty>
                                    </td>
                                    <td>
                                        <Ty type="h3">{author}</Ty>
                                    </td>
                                    <td>
                                        <Ty clickable href={`contest/${contest_id}/submit/${slug}`}
                                        color="blue" type="h3"> submit </Ty>
                                    </td>
                                </tr>
                            </>
                        })
                    }
                </tbody>
            </table>
        </>
    );
}

export default Page