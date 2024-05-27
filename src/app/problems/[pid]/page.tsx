'use client'

import Topbar from "@/app/components/Topbar"
import WorkSpace from "@/app/components/WorkSpace"
import { problems } from "@/app/utils/problems"
import { notFound } from "next/navigation"

export default function Problem(){
    return (
        <div>
            <Topbar problemPage/>
            <WorkSpace />
        </div>
    )
};

export async function getStaticPath() {
    const paths = Object.keys(problems).map((key) => ({
        params: {pid:key}
    }))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}:any) {
    const [pid] = params;
    const problem = problems[pid];

    if(!problem){
        return {
            notFound: true
        }
    }
    return {
        props: {
            problem
        }
    }
}