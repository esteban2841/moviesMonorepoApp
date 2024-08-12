'use client'
import SVGSignIcon from '@/components/atoms/SVGSignIcon'
import SVGBellIcon from '@/components/atoms/SVGBellIcon'
import SVGSunIcon from '@/components/atoms/SVGSunIcon'
import SVGUserCircle from '@/components/atoms/SVGUserCircle'
import { useContext } from 'react'
import { MoviesContext } from '@/context'

export const RightMenu = () => {
  const { isLoginModalOpen, toggleLoginModal } = useContext(MoviesContext)

  return (
    <div className='flex flex-row items-center justify-center gap-4'>
        <SVGSignIcon className='cursor-pointer'/>
        <SVGBellIcon className='cursor-pointer'/>
        <SVGSunIcon className='cursor-pointer'/>
        <SVGUserCircle onClick={()=>toggleLoginModal(!isLoginModalOpen)} className='cursor-pointer'/>
    </div>
  )
}
