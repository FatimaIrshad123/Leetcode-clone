import Split from 'react-split'
import ProblemDescription from './ProblemDescription'
import PlayGround from './PlayGround'
import { Problem } from '../utils/types/problem'
import Confetti from 'react-confetti';

type WorkSpaceProps = {
    problem: Problem;
}

const WorkSpace:React.FC<WorkSpaceProps> = ({problem}) => {
    return (
    <div>
        <Split className='split' minSize={0}>
             <ProblemDescription problem={problem}/>
             <div>
                <PlayGround problem={problem}/>
                <Confetti gravity={0.3} tweenDuration={4000}/>
             </div>
        </Split>
    </div>
    )
}
export default WorkSpace;