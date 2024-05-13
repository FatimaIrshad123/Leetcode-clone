import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { authModelState } from "../atoms/authModelAtom";

export default function Navbar(){
    const setAuthModelState = useSetRecoilState(authModelState)
    const handleClick = () => {
        setAuthModelState((prev) => ({...prev, isOpen: true}))
    };

    return (
        <div className="flex item-center justify-between sm:px-12 px-2 md:px-24">
            <Link href={'/'} className="flex item-center justify-center h-20">
                <img src="/logo.png" alt="leetclone" className="h-full"/>
                </Link>
                <div className="flex items-center">
                    <button className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent transition duration-300 ease-in-out"
                    onClick={handleClick}>Sign In</button>
                </div>
        </div>
    )
}