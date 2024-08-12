'use server'

export const FilterByGenres = ({genres}: any) => {



  return (
    <div className="w-full">
        <select className="bg-[#1C1C1C] w-full p-2" >
            <option value="">Select a Genre</option>
            {
                genres?.map((genre: any) =>{
                    return <option className="" value={genre.id} key={genre.id}>{genre.name}</option>
                })
            }
        </select>
    </div>
  )
}
