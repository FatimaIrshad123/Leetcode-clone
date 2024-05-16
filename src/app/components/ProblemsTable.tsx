import { BsCheckCircle } from "react-icons/bs";
import { problems } from "../mockProblems/problems";

export default function ProblemTable(){
    return (
        <div>
            <tbody className="text-white">
                {problems.map((doc,idx) => {
                    return (
                        <tr className={`${idx % 2 === 1 ? 'bg-dark-layer-1' : ''}`} key={doc.id}>
                            <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                                <BsCheckCircle fontSize={'18'} width='18'/>
                            </th>
                        </tr>
                    )
                })}
            </tbody>
        </div>
    )
}