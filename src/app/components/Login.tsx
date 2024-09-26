import { useSetRecoilState } from "recoil"
import { authModelState } from "../atoms/authModelAtom"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import {useRouter} from 'next/navigation'
import { toast } from "react-toastify";

export default function Login(){
    const setAuthModelState = useSetRecoilState(authModelState)
    const [inputs,setInputs] = useState({email:'',password:''})
    const [signInWithEmailAndPassword,user,loading,error] = useSignInWithEmailAndPassword(auth);
    const router = useRouter()

    const handleCLick = (type:'login' | 'register' | 'forgotPassword') => {
        setAuthModelState((prev) => ({...prev,type}))
    }
   
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
        
      const handleLogin = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!inputs.email || !inputs.password)return alert("Please fill all fields")
        try {
            const newUser = await signInWithEmailAndPassword(inputs.email,inputs.password);
            if (!newUser) return;
            router.push('/')
        }catch(error:any){
            console.log(error)
            toast.error(error.message, {position: "top-center",autoClose: 3000, theme: 'dark'})
        }}

        useEffect(() => {
            if(error) toast.error(error.message, {position: "top-center",autoClose: 3000, theme: 'dark'})
          },[error])
          
    return (
        <form className="space-y-6 px-6 pb-4" onSubmit={handleLogin}>
            <h3 className="text-xl font-medium text-white">Sign in to LeetClone</h3>
            <div>
                <label className="text-sm font-medium block mb-2 text-gray-300" htmlFor="email">
                    Your Email
                </label>
                <input type="email"
                onChange={handleInputChange} 
                name="email" id="email" className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="name@company.com"/>
            </div>
            <div>
                <label className="text-sm font-medium block mb-2 text-gray-300" htmlFor="password">
                    Your Password
                </label>
                <input type="password"
                onChange={handleInputChange}  name="password" id="password" className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="********"/>
                <button type="submit" className="text-white w-full focus:rig-blue-300 text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s font-medium rounded-lg mt-4">
                {loading ? "Loading..." : "Login"}
                </button>
                <button className="flex w-full justify-end mt-4" onClick={() => handleCLick('forgotPassword')}>
                    <a href='#' className="text-sm text-brand-orange block hover:underline w-full text-right">
                        Forgot Password
                    </a>
                </button>
                <div className="text-sm font-medium text-gray-500" onClick={() => handleCLick('register')}>
                    Not Registered?  
                    <a href="#" className="text-blue-700 hover:underline">
                        Create account
                    </a>
                </div>
            </div>
        </form>
    )
}