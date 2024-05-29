'use client'

import { useParams } from 'next/navigation'
import Topbar from "@/app/components/Topbar"
import WorkSpace from "@/app/components/WorkSpace"
import { Problem } from "@/app/mockProblems/problems"
import { problems } from "@/app/utils/problems"
import { pid } from 'process'
import { useRouter } from 'next/navigation'

type problemPageProps = {
    problem: Problem
}

/*const problemPage: React.FC<problemPageProps> = ({problem}) =>{
   console.log(problem)
    return (
        <div>
            <Topbar problemPage/>
            <WorkSpace problem={problem}/>
        </div>
    )
};*/
const problemPage = ({ params }: { params: { pid: string } }) => {
	const { pid } = params;
	const problem = problems[pid];
	console.log(problem)

	if (!problem) {
	  return {
		notFound: true,
	};
	}
  
	return (
		<div>
		<Topbar problemPage/>
		<WorkSpace problem={problem}/>
	</div>
	);
  };

export default problemPage;

export async function getStaticPaths() {
	const paths = Object.keys(problems).map((key) => ({
		params: { pid: key },
	}));

	return {
		paths,
		fallback: false,
	};
}

// getStaticProps => it fetch the data

/*export async function getStaticProps({ params }: { params: { pid: string } }) {
	const { pid } = params;
	const problem = problems[pid];
console.log(problem)
	if (!problem) {
		return {
			notFound: true,
		};
	}
	problem.handlerFunction = problem.handlerFunction.toString();
	return {props: {problem}};
}*/