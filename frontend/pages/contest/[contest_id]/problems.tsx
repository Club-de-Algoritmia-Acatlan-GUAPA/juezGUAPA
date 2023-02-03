import type { ContestProblems, ProblemInfo } from "@utils/types"
import type { NextPageWithLayout } from "@pages/_app"
import type { Contest } from '@utils/types'

import LayoutContest, { useContest, contestGetLayout } from "@utils/LayoutContest"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import useSWR from "swr"
// /contest/123/
import Ty from "@components/typography/typography"
import { NavbarContest, CONTEST_OPTIONS } from "@components/contest/navbarContest/navbarContest"
import { multifetcher, fetcher } from '@utils/fetchers'


const ABC: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const Problems: NextPageWithLayout = () => {

    const router = useRouter()
    const { contest_id } = router.query
    const { data, error, isLoading } = useSWR<any[]>(
        [
            `/api/contest/${contest_id}/problems`,
            `/api/contest/${contest_id}/status`
        ], multifetcher
    )

    const dataContest = data ? data[0] : {}
    const problemStatus = data ? data[1] : []

    console.log(data)
    const { data: session, status }: any = useSession()

    const contestData: Contest = useContest()

    // if (!problemsInfo || !contestName) {
    //     return <Ty type="h1" weight="black" > Oops {":("} Data of the problems wasn't found</Ty>
    // }
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Something gone wrong</div>
    }
    return (
        <>
            <div className="flex">
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
                            dataContest?.problemsInfo.map(({ id, name, author, slug }: ProblemInfo, idx: number) => {
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
                <table className="max-w-mi table">
                    <thead>
                        <tr>
                            <th >
                                <Ty type="h2" weight="bold">Status</Ty>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            problemStatus.length > 0 
                            ?   problemStatus.map((elem: any) => {
                                    return <>
                                        <tr>
                                            <td> {
                                                elem.status === 'AC'
                                                    ? <Ty color="green" type="h3" weight="bold"> Accepted </Ty>
                                                    : elem.status === 'WA' || elem.status == 'RTE'
                                                        ? <Ty color="red" type="h3" weight="bold"> Wrong Answer </Ty>
                                                        : <Ty color="blue" type="h3"> ?  </Ty>
                                            }
                                            </td>
                                        </tr>
                                    </>
                                })
                            :   
                                dataContest.map( (_:any) => {
                                    return <>
                                        <tr>
                                            <td> </td>
                                        </tr>
                                    </>
                                })
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
}

Problems.getLayout = contestGetLayout

export default Problems