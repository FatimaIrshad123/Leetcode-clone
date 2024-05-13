'use client'
import { RecoilRoot } from "recoil"
import AuthPage from "../components/AuthPage"

export default function(){
    return (
        <RecoilRoot>
            <AuthPage />
        </RecoilRoot>
    )
}