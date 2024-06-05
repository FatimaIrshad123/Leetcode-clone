import { BsCheckCircle } from "react-icons/bs";
import { problems } from "../mockProblems/problems";
import Link from "next/link";
import { AiFillYoutube } from "react-icons/ai";
import YouTube from "react-youtube";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

type ProblemTableProps = {
    setLoadingProblem: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProblemTable: React.FC<ProblemTableProps> = ({setLoadingProblem}) => {
    const [youtubePlaye, setYoutubePlayer] = useState({
        isOpen: false,
        videoId: ""
    })
    const problem = useGetProblem(setLoadingProblem)

    const closeModel = () => {
        setYoutubePlayer({isOpen: false, videoId: ""})
    }

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape')closeModel();
        }
        window.addEventListener("keydown",handleEsc)
        return () => window.removeEventListener("keydown",handleEsc)
    })
    return (
        <>        
            <tbody className="text-white">
                {problems.map((problem,idx) => {
                    const difficultyColor = problem.difficulty === "Easy" ? "text-dark-green-s": problem.difficulty === "Medium" ? "text-dark-yellow": "text-dark-pink";

                    return (
                        <tr className={`${idx % 2 === 1 ? 'bg-dark-layer-1' : ''}`} key={problem.id}>
                            <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                                <BsCheckCircle fontSize={'18'} width='18'/>
                            </th>
                            <td className="px-6 py-4">
                                <Link href={`/problems/${problem.id}`} className="hover:text-blue-600 cursor-pointer">
                                    {problem.title}
                                </Link>
                            </td>
                            <td className={`px-6 py-4 ${difficultyColor}`}>
                                {problem.difficulty}
                            </td>
                            <td className={`px-6 py-4`}>
                                {problem.category}
                            </td>
                            <td className={`px-6 py-4`}>
                                {problem.videoId ? (
                                    <AiFillYoutube 
                                    onClick={() => setYoutubePlayer({isOpen:true, videoId: problem.id as string})}
                                    fontSize={'18'}
                                    className="cursor-pointer hover:text-red-500"/>
                                ) : (
                                   <p className="text-gray-400">Coming soon</p>
                                )}
                            </td>
                           
                        </tr>
                    )
                })}
            </tbody>
            {youtubePlaye.isOpen && (
            <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
                <div className="bg-black z-10 opacity-20 top-0 left-0 w-screen h-screen absolute"></div>
                <div className="w-full z-50 h-full px-6 relative max-w-4xl">
                    <div className="w-full h-full flex items-center justify-center relative">
                        <div className="w-full relative">
                            <IoCloseSharp fontSize={'35'} onClick={closeModel}className='cursor-pointer absolute -top-16 right-0'/>
                            <YouTube videoId={youtubePlaye.videoId} loading="lazy" iframeClassName="w-full min-h-[500px]"/>
                        </div>
                    </div>
                </div>
            </tfoot>
        )}
    </>
    )
}

export default ProblemTable;

function useGetProblem(setLoadingProblem: React.Dispatch<React.SetStateAction<boolean>>){
    const [problem,setProblem] = useState([]);
    
    useEffect(() => {
        const getProblems = async () => {
            setLoadingProblem(true);
            const q = query(collection(firestore,"problems"),orderBy("order",'asc'))
            const querySnapshot = await getDocs(q)
            let tmp:any = [];
            querySnapshot.forEach((doc) => {
                tmp.push({id:doc.id, ...doc.data()})
              });
              setProblem(tmp)
              setLoadingProblem(false)
        }
        getProblems()
    },[])
}