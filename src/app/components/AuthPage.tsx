import { useRecoilValue } from "recoil";
import AuthModel from "./AuthModel";
import Navbar from "./Navbar";
import { authModelState } from "../atoms/authModelAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage(){
    const authmodel = useRecoilValue(authModelState)
    const [pageLoading,setPageLoading] = useState(true);
    const [user,loading,error] = useAuthState(auth)
    const router = useRouter()

    useEffect(() => {
        if (user) router.push('/')
        if (!loading && !user) setPageLoading(false);
    },[user,router,loading])

    if (pageLoading) return null;
    return (
        <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
            <div className="max-w-7xl mx-auto">
                <Navbar />
                <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
                    <img src="/hero.png" alt="Hero img"/>
                </div>
                {authmodel.isOpen && <AuthModel />}
            </div>
        </div>
    )
}