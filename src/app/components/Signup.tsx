import { useSetRecoilState } from "recoil"
import { authModelState } from "../atoms/authModelAtom"
import { useEffect, useState } from "react"
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";

export default function Signup(){
    const setAuthModelState = useSetRecoilState(authModelState)
    const handleCLick = (type:'login' | 'register' | 'forgotPassword') => {
        setAuthModelState((prev) => ({...prev,type}))
    }
    const router = useRouter();
    const [input,setInputs] = useState({email:'',displayName:'',password:''})

    const [createUserWithEmailAndPassword,user,loading,error,] = useCreateUserWithEmailAndPassword(auth);

    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleRegister = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!input.email || !input.password) return alert('Please fill all fields')
        try{
            const newUser = await createUserWithEmailAndPassword(input.email, input.password)
            if(!newUser)return;
            router.push('/')
        }catch(error:any){
            alert(error.message)
        }
    }

    useEffect(() => {
        if(error) {
            alert(error.message)
            console.log(error)
        }
    },[error])
    return (
        <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
        <h3 className="text-xl font-medium text-white">Register to LeetClone</h3>
        <div>
            <label className="text-sm font-medium block mb-2 text-gray-300" htmlFor="email">
                Email
            </label>
            <input type="email" name="email" id="email" className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="name@gmail.com"
            onChange={handleChangeInput}/>
        </div>
        <div>
            <label className="text-sm font-medium block mb-2 text-gray-300" htmlFor="name">
                Display Name
            </label>
            <input type="name" name="name" id="name" className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="name"
            onChange={handleChangeInput}/>
        </div>
        <div>
            <label className="text-sm font-medium block mb-2 text-gray-300" htmlFor="password">
                Password
            </label>
            <input type="password" name="password" id="password" className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="********"
            onChange={handleChangeInput}/>
            <button type="submit" className="text-white w-full focus:rig-blue-300 text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s font-medium rounded-lg mt-4"
           >
                {loading ? "Registering..." : "Register"}
            </button>
            <div className="text-sm font-medium text-gray-500 mt-5">
                Already have an account?  
                <a href="#" className="text-blue-700 hover:underline" onClick={() => handleCLick('login')}>
                    Login 
                </a>
            </div>
        </div>
    </form>
    )
}