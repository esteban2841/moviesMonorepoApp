'use client'
import { MoviesContext } from "@/context"
import Image from "next/image"
import { useContext } from "react"
import { SignButtons } from "../atoms/SignButtons"
import { SignForm } from "./SignForm"

export const ModalSign = () => {
  const { signButonSelected, isLoginModalOpen, toggleLoginModal } = useContext(MoviesContext)
	console.log("TCL: ModalSign -> signButonSelected", signButonSelected)
  return (
    isLoginModalOpen ? <div className="fixed w-full max-w-5xl w-full h-[600px]
    flex flex-row items-center rounded-3xl justify-center p-4
    backgroundImageLoad backdrop-blur-lg z-30 overflow-hidden
">
    <div className=" h-full w-3/5">
      <div className="flex flex-col p-10 text-[#fff]">
        <div onClick={()=>toggleLoginModal(!isLoginModalOpen)} className="cursor-pointer flex flex-row gap-2 ">

          <button className="flex border-solid border-white w-[30px]" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            
          </button>
          <p>Back</p>
        </div>
        <div className="content-sign-body flex flex-col justify-center items-center gap-4 p-10">

          <h1>HOLAS</h1>
          <SignButtons/>
          <SignForm></SignForm>
        </div>
      </div>
    </div>
    <div className=" flex flex-col items-center justify-between w-2/5 h-full bg-[#1C1C1C] rounded-r-3xl ">
      <div className="flex flex-col gap-4 items-center justify-center text-xl text-[#fff] w-full p-8 ">
        <h1 className="text-3xl text-center">Welcome to Inlaze Movies!</h1>
        <h5 className="text-sm text-center">🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!</h5>
      </div>
      {
        signButonSelected == 'sign'
        ? <div>
            <Image width={500} height={500} alt="user dummy" src={'/user-logo.png'} />
          </div>
        :<div>
        <Image width={500} height={500} alt="user dummy" src={'/dummy.png'} />
      </div>
        
      }
    </div>
</div>: <></>
  )
}
