'use client'

import { ROUTES } from "@/consts/routes"
import { MoviesContext } from "@/context"
import { SectionReference, SwiperHomeProps } from "@/types/movies"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext } from "react"

interface Route {
  href: string;
  name: string;
  hasImage?: boolean;
}

export const NavSectionElements = () => {
  const { sliderSections, currentUser } = useContext(MoviesContext)

  const additionalRoutes = [
    {
    href: '/favorites',
    name: 'favorites',
    },
    {
        href: '/saved',
        name: 'saved',
    },
  ]
  const hasData = currentUser && currentUser.hasOwnProperty('_id')
  const allRoutes = hasData ? [...ROUTES, ...additionalRoutes] : [...ROUTES]
  const set = new Set(allRoutes)
  const gettingRidOfDuplicates = Array.from(set)
  const router = useRouter()
  const navigateHome = ()=>{router.push('/')}
  const navigateToSection = (name: string): void =>{
    const sectionRef : any = sliderSections.find((section)=>{
      return section.name == name.toLowerCase()
    })
    const {sectionSlider}  = sectionRef
    const offset = -20;
    sectionSlider.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest', top: `-=${offset}px` });
      
  }
  return (
    <div className="w-max-content max-w-7xl flex flex-row justify-evently items-center gap-10 p-2 bg-[#000]">
          {
            gettingRidOfDuplicates.map((route: Route)=>{
              return <div onClick={()=>navigateToSection(route.name)} key={route.name} className="cursor-pointer hover:text-[#e6a713] capitalize" >
                {route.hasImage 
                  ? <Image onClick={navigateHome} className="cursor-pointer" src={'/inlazeLogo.png'} width={134} height={42} alt="Inlaze logo"/>
                  : <h6>{route.name}</h6>
                }
              </div>
            })
          }
    </div>
  )
}
