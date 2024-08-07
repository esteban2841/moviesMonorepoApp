'use server'

import { ROUTES } from "@/consts/routes"
import Image from "next/image"
import Link from "next/link"

export const NavSectionElements = () => {
  return (
    <div className="w-max-content max-w-7xl flex flex-row justify-evently items-center gap-10 p-2 bg-[#000]">
          {
            ROUTES.map(route=>{
              return <Link href={route.href} key={route.name} className="text-[#F6F6F6] capitalize">
                {route.hasImage 
                  ? <Image src={'/inlazeLogo.png'} width={134} height={42} alt="Inlaze logo"/>
                  : <h6>{route.name}</h6>
                }
              </Link>
            })
          }
    </div>
  )
}
