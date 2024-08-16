'use client'

import { HomeSwiperSection } from "./HomeSwiperSection"

export const UserSavedFavSlider = ({user}) => {
    const {favorites, saved} = user
    return (
        <div className="w-full flex flex-col items-center">
            {
                favorites?.map((movieSlider, index)=>{

                        return (
                            <div key={index} className="w-full flex flex-col items-center">
                                <HomeSwiperSection sectionName={'saved'} sectionData={movieSlider.data} />
                            </div>
                        )
                })
            }
            {
                saved?.map((movieSlider, index)=>{

                        return (
                            <div key={index} className="w-full flex flex-col items-center">
                                <HomeSwiperSection sectionName={'favorites'} sectionData={movieSlider.data} />
                            </div>
                        )
                })
            }
        </div>
    )
}
