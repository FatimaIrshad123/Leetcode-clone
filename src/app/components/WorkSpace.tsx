import Split from 'react-split'
import ProblemDescription from './ProblemDescription'
import PlayGround from './PlayGround'


export default function WorkSpace({problem}:any){
    return (
    <div>
        <Split className='split' minSize={0}>
             <ProblemDescription problem={problem}/>
             <PlayGround />
        </Split>
    </div>
    )
}