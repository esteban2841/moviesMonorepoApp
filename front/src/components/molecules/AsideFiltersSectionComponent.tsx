import { FilterByGenres } from "../atoms/FilterByGenres"
import { fetchDataSections } from "@/helpers/fetch"

export const AsideFiltersSectionComponent = async () => {

  const url = 'http://localhost:8000/movies'
  const {name, data} = await fetchDataSections(url, 'genres')

  return (
    <aside className="flex flex-col relative 
      h-full box-border 
      items-center gap-2 justify-start 
      bg-[#262626] w-[260px] p-[16px]">
        <h6>Genres</h6>
        <FilterByGenres genres={data.genres}></FilterByGenres>
    </aside>
  )
}
