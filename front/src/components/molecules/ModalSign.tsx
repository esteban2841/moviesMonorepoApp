'use client'
import { MoviesContext } from "@/context"
import { useContext } from "react"

export const ModalSign = () => {
  const { isLoginModalOpen, toggleLoginModal } = useContext(MoviesContext)
  return (
    isLoginModalOpen ? <div className="absolute w-full max-w-5xl max-h-full h-[600px]
    flex flex-row items-center rounded-xl justify-center p-4
    backgroundImageLoad backdrop-blur-3xl z-30
">
    <div className="relative h-full w-3/5 bg-[#f5eaea]/24">
        <h1>aca</h1>
    </div>
    <div className="relative w-2/5 h-full bg-[#1C1C1C]">
        <h1>aca</h1>

    </div>
</div>: <></>
  )
}
