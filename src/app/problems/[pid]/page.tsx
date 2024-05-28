'use client'

import Topbar from "@/app/components/Topbar"
import WorkSpace from "@/app/components/WorkSpace"
import { Problem } from "@/app/mockProblems/problems"
import { problems } from "@/app/utils/problems"

type problemPageProps = {
    problem: Problem
}

const problemPage: React.FC<problemPageProps> = ({problem}) =>{
    console.log(problem)
    return (
        <div>
            <Topbar problemPage/>
            <WorkSpace problem={problem}/>
        </div>
    )
};

export default problemPage;

export async function getStaticPaths() {
    const paths = Object.keys(problems).map((key) => ({
        params: {pid:key}
    }))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProp({params}:{ params: { pid: string } }) {
    const {pid} = params;
    const problem = problems[pid];

    if(!problem){
        return {
            notFound: true
        }
    }
    problem.handlerFunction = problem.handlerFunction.toString();
    return {
        props: {
            problem
        }
    }
}