import Split from 'react-split'
import ProblemDescription from './ProblemDescription'


export default function WorkSpace(){
    return (
    <div>
        <Split className='split'>
             <ProblemDescription />
             <div>The code editor will be here</div>
        </Split>
    </div>
    )
}