'use client'

import { useContext, useEffect, useState } from "react"
import { HomeSwiperSection } from "./HomeSwiperSection"
import { fetchUserSaved, fetchUserFavorites } from "@/helpers/fetch"
import { SwiperHomeProps } from "@/types/movies"
import { MoviesContext } from "@/context"
import { User } from "@/context/movies/MoviesProvider"

export const UserSavedFavSlider = ({user}: any) => {

    const { currentUser } = useContext(MoviesContext)
    const [sections, setSections] = useState<Array<SwiperHomeProps>>([])

    useEffect(()=>{
        const fetchUserSelections = async () => {
            const favorites = await fetchUserFavorites(`${process.env.BACKEND_URI}/movies`, user)
            const saved = await fetchUserSaved(`${process.env.BACKEND_URI}/movies`, user)
            const sectionsFetched = [{...favorites}, {...saved}]
			setSections(sectionsFetched)
        }
        fetchUserSelections()
    }, [user])

    return (
        <div className="w-full flex flex-col items-center">
            {
                sections.length > 0 && sections.map((movieSlider: SwiperHomeProps, index: number)=>{

                        return (
                            <div key={index} className="w-full flex flex-col items-center">
                                <HomeSwiperSection sectionName={movieSlider.sectionName} sectionData={movieSlider.sectionData} />
                            </div>
                        )
                })
            }
        </div>
    )
}
