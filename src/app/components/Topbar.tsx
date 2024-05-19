"use client"
import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase/firebase"
import LogoutButton from "./LogoutButton";
import { useSetRecoilState } from "recoil";
import { authModelState } from "../atoms/authModelAtom";
import Image from 'next/image';

export default function Topbar(){
	const [user] = useAuthState(auth);
//	console.log(user)
	const setAuthModalState = useSetRecoilState(authModelState)

    return (
        <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
			<div className={`flex w-full items-center justify-between`}>
				<Link href='/' className='h-[22px] flex-1'>
					<Image src='/logo-full.png' alt='Logo' height={100} width={100} />
				</Link>				
				<div className='flex items-center space-x-4 flex-1 justify-end'>
					<div>
						<a
							href='https://www.buymeacoffee.com/burakorkmezz'
							target='_blank'
							rel='noreferrer'
							className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2'
						>
							Premium
						</a>
					</div>
					{!user && (
						<Link href='/home' onClick={() => {
							setAuthModalState((prev) => ({...prev, isOpen: true, type: "login"}))
						}}>
						<button className='bg-dark-fill-3 py-1 px-2 cursor-pointer rounded'>Sign In</button>
					</Link>
					)}
					{user && (
						<div className="cursor-pointer group relative">
							<img src="/avatar.png" alt="user profile img" className="h-8 w-8 rounded-lg"/>
							<div className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-brand-orange z-40 p-2 rounded shadow-lg group-hover:scale-100 scale-0 transition-all duration-100 ease-in-out">
								<p className="text-sm">{user.email}</p>
							</div>
						</div>
					)}
					{user && <LogoutButton />}
				</div>
			</div>
		</nav>
    )
}