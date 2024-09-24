import PreferenceNavbar from "./PreferenceNavbar";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "../utils/types/problem";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "../utils/problems";
import { useParams, useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

type PlaygroundProps = {
    problem: Problem;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setSolved: React.Dispatch<React.SetStateAction<boolean>>;
}
const PlayGround:React.FC<PlaygroundProps> = 
 ({problem, setSuccess, setSolved}:any)=>{
    const [activeTestCaseId,setActiveTextCaseId] = useState(0);
    let [userCode,setUserCode] = useState<string>(problem.starterCode)
    const [user] = useAuthState(auth);
    //const {query : {pid}} = useRouter()
    
    const params = useParams()
    const pid = params.pid;
    //console.log(pids)
    const handleSubmit = async() => {
        //alert ('Submitted')
        if (!user){
            toast.error("Please login to submit your code", {
                position: "top-center",
                autoClose: 3000,
                theme:"dark"
            })
            return
        }
        try {
            userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
            const cb = new Function(`return ${userCode}`)()
            const handler = problems[pid as string].handlerFunction;
            
            if (typeof handler === "function"){
                const success = handler(cb);
                if (success){
                    toast.success('Congrats! All tests passed!', {
                        position:"top-center",autoClose:3000, theme: "dark"
                    })
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false)
                    },4000)
                    const userRef = doc(firestore, "users", user.uid);
                    await updateDoc(userRef, {
                        solvedProblems: arrayUnion(pid)
                    });
                    setSolved(true);
                }
            }
            
        }catch (error){
            console.log(error);
            toast.error("Oops! One or more test cases failed",{
                position: 'top-center', autoClose: 3000, theme: 'dark'
            })
        }
    }
    const onChange = (value: string) => {
        setUserCode(value);
        localStorage.setItem(`code-${pid}`, JSON.stringify(value))
    }

    useEffect(() => {
        const code = localStorage.getItem(`code-${pid}`)
        if (user){
            setUserCode(code ? JSON.parse(code) : problem.starterCode);
        }else {
            setUserCode(problem.starterCode)
        }
    },[pid,user,problem.starterCode])

    return (
        <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
            <PreferenceNavbar />
            <Split className="h-[calc(100vh-34px)]" direction="vertical" sizes={[60,40]} minSize={60}>
                <div className="w-full overflow-auto">
                    <CodeMirror 
                    value={userCode}
                    theme={vscodeDark}
                    onChange={onChange}
                    extensions={[javascript()]}
                    style={{fontSize:16}}/>
                </div>
                <div>
                    <div className="w-full px-5 overflow-auto">
                        {/*testcase heading*/}
                        <div className="flex h-10 items-center space-x-6">
                            <div className="relative flex h-full flex-col justify-center cursor-pointer">
                                <div className="flex-sm font-medium leading-5 text-white">Testcases</div>
                                <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white"/>
                            </div>
                        </div>

                        <div className="flex">
                           {problem.examples.map((example:any,index:any)=> {
                            return (
                            <div className="mr-2 items-center mt-2 " key={example.id}onClick={() => setActiveTextCaseId(index)}>                           
                                <div className="flex flex-wrap items-center gap-y-4">
                                <div className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${activeTestCaseId === index ? "text-white": "text-gray-500"}`}>
                                Case {index+1}
                                </div>
                                 </div>
                            </div>
                        )})}
                        </div>
                    </div>

                    <div className="font-semibold m-4">
                        <p className="text-sm font-medium mt-4 text-white">Input:</p>
                        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                            {problem.examples[activeTestCaseId].inputText}
                        </div>
                        <p className="text-sm font-medium mt-4 text-white">Outputs:</p>
                        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                        {problem.examples[activeTestCaseId].outputText}
                        </div>
                    </div>
                </div>
            </Split>
            <EditorFooter handleSubmit={handleSubmit}/>
        </div>
    )
}

export default PlayGround;