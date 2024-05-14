'use client'
import { RecoilRoot } from "recoil";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <RecoilRoot>
      <Navbar />
    </RecoilRoot>  
  );
}
