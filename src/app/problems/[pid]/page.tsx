//'use client'

import { useParams } from 'next/navigation'
import Topbar from "@/app/components/Topbar"
import WorkSpace from "@/app/components/WorkSpace"
import { Problem } from "@/app/mockProblems/problems"
import { problems } from "@/app/utils/problems"
import useHasMounted from '@/app/hooks/useHasMounted'

import ProblemClientComponent from './ProblemClientComponent';

interface ProblemPageProps {
  params: {
    pid: string;
  };
}

const ProblemPage = ({ params }:  { params: { pid: string }}) => {
  const { pid } = params;
  const problem = problems[pid];
	
  if (!problem) {
    return <div>Problem not found</div>;
  }
  console.log('hiii')

  problem.handlerFunction = problem.handlerFunction.toString();

  return (
    <ProblemClientComponent problem={problem} pid={pid}/>
  );
};

export default ProblemPage;

export async function generateStaticParams() {
  const paths = Object.keys(problems).map((pid) => ({
    pid,
  }));
  //console.log(paths)
  return paths;
}
