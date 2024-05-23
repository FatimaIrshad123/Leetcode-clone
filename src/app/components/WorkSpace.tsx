import Split from 'react-split'
import ProblemDescription from './ProblemDescription'
import PlayGround from './PlayGround'


export default function WorkSpace(){
    return (
    <div>
        <Split className='split' minSize={0}>
             <ProblemDescription />
             <PlayGround />
        </Split>
    </div>
    )
}