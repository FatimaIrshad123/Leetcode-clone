import { useRecoilValue } from "recoil";
import AuthModel from "./AuthModel";
import Navbar from "./Navbar";
import { authModelState } from "../atoms/authModelAtom";

export default function AuthPage(){
    const authmodel = useRecoilValue(authModelState)
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