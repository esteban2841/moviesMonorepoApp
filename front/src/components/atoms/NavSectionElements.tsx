'use client'

import { ROUTES } from "@/consts/routes"
import { MoviesContext } from "@/context"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"

export const NavSectionElements = () => {
  const { sliderSections } = useContext(MoviesContext)
  const navigateToSection = (name: string)=>{
    const sectionRef = sliderSections.filter(section=>{
      return section.name == name.toLowerCase()
    })
    const {sectionSlider} = sectionRef[0]
    const offset = -20;
    sectionSlider.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest', top: `-=${offset}px` });
  }
  return (
    <div className="w-max-content max-w-7xl flex flex-row justify-evently items-center gap-10 p-2 bg-[#000]">
          {
            ROUTES.map(route=>{
              return <a onClick={()=>navigateToSection(route.name)} key={route.name} className="capitalize">
                {route.hasImage 
                  ? <Image src={'/inlazeLogo.png'} width={134} height={42} alt="Inlaze logo"/>
                  : <h6>{route.name}</h6>
                }
              </a>
            })
          }
    </div>
  )
}
