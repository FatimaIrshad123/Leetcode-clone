import { BsCheckCircle } from "react-icons/bs";
import { problems } from "../mockProblems/problems";
import Link from "next/link";
import { AiFillYoutube } from "react-icons/ai";
import YouTube from "react-youtube";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function ProblemTable(){
    const [youtubePlaye, setYoutubePlayer] = useState({
        isOpen: false,
        videoId: ""
    })
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
                {problems.map((doc,idx) => {
                    const difficultyColor = doc.difficulty === "Easy" ? "text-dark-green-s": doc.difficulty === "Medium" ? "text-dark-yellow": "text-dark-pink";

                    return (
                        <tr className={`${idx % 2 === 1 ? 'bg-dark-layer-1' : ''}`} key={doc.id}>
                            <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                                <BsCheckCircle fontSize={'18'} width='18'/>
                            </th>
                            <td className="px-6 py-4">
                                <Link href={`/problems/${doc.id}`} className="hover:text-blue-600 cursor-pointer">
                                    {doc.title}
                                </Link>
                            </td>
                            <td className={`px-6 py-4 ${difficultyColor}`}>
                                {doc.difficulty}
                            </td>
                            <td className={`px-6 py-4`}>
                                {doc.category}
                            </td>
                            <td className={`px-6 py-4`}>
                                {doc.videoId ? (
                                    <AiFillYoutube 
                                    onClick={() => setYoutubePlayer({isOpen:true, videoId: doc.id as string})}
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