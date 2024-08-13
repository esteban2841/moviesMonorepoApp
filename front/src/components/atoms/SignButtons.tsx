import { MoviesContext } from "@/context"
import { useContext } from "react"

export const SignButtons = () => {
    const { signButonSelected, setSignButton } = useContext(MoviesContext)
    const toggleButtonSelection = (e)=>{
        const selected = e.target.id || signButonSelected
        setSignButton(selected)
    }
  return (
    <div className="sign-buttons bg-[#1C1C1C] rounded-lg flex flex-row justify-center items-center">
        <button id="sign" onClick={toggleButtonSelection} className={`bg-[#1C1C1C] ${signButonSelected == 'sign' && 'selected'} hover:bg-[#F0B90B] px-4 py-2 rounded-lg`}>Sign up</button>
        <button id='log' onClick={toggleButtonSelection} className={`bg-[#1C1C1C] ${signButonSelected == 'log' && 'selected'} hover:bg-[#F0B90B] px-4 py-2 rounded-lg`}>Log in</button>
    </div>
  )
}
