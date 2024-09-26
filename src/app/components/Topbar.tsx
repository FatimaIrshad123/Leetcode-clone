"use client"
import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase/firebase"
import LogoutButton from "./LogoutButton";
import { useSetRecoilState } from "recoil";
import { authModelState } from "../atoms/authModelAtom";
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "./Timer";
import { useRouter, useSearchParams } from "next/navigation";
import { problems } from "../utils/problems";

type TopbarProps = {
	problemPage? : boolean;
}

export default function Topbar({ problemPage }: TopbarProps){
	const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModelState)
	const router = useRouter();
	const searchParams = useSearchParams()

	const handleProblemChange = (isForward: boolean) => {
		const pid = searchParams.get('pid');
		console.log(pid)
		if (!pid) return; // handle the case where pid is not present		
			const { order } = problems[pid];
			const direction = isForward ? 1 : -1;
			const nextProblemOrder = order + direction;
			const nextProblemKey = Object.keys(problems).find((key) => problems[key].order === nextProblemOrder);
	
		if (isForward && !nextProblemKey) {
		  const firstProblemKey = Object.keys(problems).find((key) => problems[key].order === 1);
		  router.push(`/problems/${firstProblemKey}`);
		} else if (!isForward && !nextProblemKey) {
		  const lastProblemKey = Object.keys(problems).find(
			(key) => problems[key].order === Object.keys(problems).length
		  );
		  router.push(`/problems/${lastProblemKey}`);
		} else {
		  router.push(`/problems/${nextProblemKey}`);
		}
	  };
	
    return (
        <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
			<div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto": ""}`}>
				<Link href='/' className='h-[22px] flex-1'>
					<Image src='/logo-full.png' alt='Logo' height={100} width={100} />
				</Link>		
				{problemPage && (
					<div className="flex items-center gap-4 flex-1 justify-center">
						<div className="flex justify-center items-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer" onClick={() => handleProblemChange(false)}>
							<FaChevronLeft />
						</div>
						<Link href="/" className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer">
							<div>
								<BsList />
							</div>
							<p>Problem List</p>
						</Link>
						<div className="flex justify-center items-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer" onClick={() => handleProblemChange(true)}>
							<FaChevronRight />
						</div>

					</div>
				)}		
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
					{user && problemPage && <Timer />}
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