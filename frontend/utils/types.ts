export type Base = {
    title: string,
    content: string,
}
export type Contest = {
    id: string,
    name: string,
    startTime?: Date,
    endTime?: Date,
    bases?: Base[],
}

export type ProblemInfo = {
    id: string,
    name: string,
    author: string,
    slug: string,
}
export type ContestProblems = {
    contestName: string,
    problemsInfo: ProblemInfo[],
}

export type ContestContextType = {
    contestData: Contest,
    setContestId: (arg: string) => void
}