'use client'
import { RecoilRoot } from "recoil"
import AuthPage from "../components/AuthPage"

export default function HomePage(){
    return (
        <RecoilRoot>
            <AuthPage />
        </RecoilRoot>
    )
}