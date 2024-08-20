'use client'

import { MoviesContext } from "@/context"
import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"
import { useContext } from "react"

export const FilterByGenres = ({genres}: any) => {
  const { setActiveFilter } = useContext(MoviesContext)
  const router = useRouter()

  const handleSelectedInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const selection = e.target.value
    
    if(selection){
      router.push(`/filter?genre=${encodeURIComponent(selection)}`);
      revalidatePath('/filter', 'page')
    } else {
      router.push(`/`);
    }
  }

  return (
    <div className="w-full">
        <select onChange={()=>handleSelectedInput} className="bg-[#1C1C1C] w-full p-2" >
            <option className="hover:bg-[#e6a713]" value="">Select a Genre</option>
            {
                genres?.map((genre: any) =>{
                    return <option className="hover:bg-[#e6a713]" value={genre.id} key={genre.id}>{genre.name}</option>
                })
            }
        </select>
    </div>
  )
}
