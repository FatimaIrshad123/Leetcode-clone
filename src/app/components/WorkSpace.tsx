import Split from 'react-split'
import ProblemDescription from './ProblemDescription'
import PlayGround from './PlayGround'
import { Problem } from '../utils/types/problem'
import Confetti from 'react-confetti';
import useWindowSize from '../hooks/useWindowSize';
import { useState } from 'react';

type WorkSpaceProps = {
    problem: Problem;
}

const WorkSpace:React.FC<WorkSpaceProps> = ({problem}) => {
    const {width,height} = useWindowSize();
    const [success,setSuccess] = useState(false);
    return (
    <div>
        <Split className='split' minSize={0}>
             <ProblemDescription problem={problem}/>
             <div>
                <PlayGround problem={problem} setSuccess= {setSuccess}/>
                {success && <Confetti gravity={0.3} tweenDuration={4000} width={width - 1} height={height - 1}/>}
             </div>
        </Split>
    </div>
    )
}
export default WorkSpace;