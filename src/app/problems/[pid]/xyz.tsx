'use client'

import { useParams } from 'next/navigation'
import Topbar from "@/app/components/Topbar"
import WorkSpace from "@/app/components/WorkSpace"
import { Problem } from "@/app/mockProblems/problems"
import { problems } from "@/app/utils/problems"
import useHasMounted from '@/app/hooks/useHasMounted'


type ProblemPageProps = {
	problem: Problem;
};

const ProblemPage: any = ({ params }: { params: { pid: string } }) => {
	const { pid } = params;
	const problem = problems[pid];
  
	if (!problem) {
	  return <div>Problem not found</div>;
	}
  
	return (
	  <div>
		<Topbar problemPage />
		<WorkSpace problem={problem} />
	  </div>
	);
  };
  
  export default ProblemPage;
  
  export async function generateStaticParams() {
	const paths = Object.keys(problems).map((pid) => ({
	  pid,
	}));
  
	return paths;
  }
/*const ProblemPage: React.FC = ({ problem }:any) => {
	const hasMounted = useHasMounted();

	if (!hasMounted) return null;

	return (
		<div>
			<Topbar problemPage />
			<WorkSpace problem={problem} />
		</div>
	);
};
export default ProblemPage;

// fetch the local data
//  SSG
// getStaticPaths => it create the dynamic routes
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

export async function getStaticProps({ params }: { params: { pid: string } }) {
	const { pid } = params;
	const problem = problems[pid];
	console.log(pid)
	if (!problem) {
		return {
			notFound: true,
		};
	}
	problem.handlerFunction = problem.handlerFunction.toString();
	return {
		props: {
			problem,
		},
	};
}*/