import { problems } from "@/app/utils/problems"
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
  return paths;
};
