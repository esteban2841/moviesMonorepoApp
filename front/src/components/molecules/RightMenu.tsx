'use client'
import SVGSignIcon from '@/components/atoms/SVGSignIcon'
import SVGBellIcon from '@/components/atoms/SVGBellIcon'
import SVGSunIcon from '@/components/atoms/SVGSunIcon'
import SVGUserCircle from '@/components/atoms/SVGUserCircle'
import { useContext, useEffect, useState } from 'react'
import { MoviesContext } from '@/context'

export const RightMenu = () => {
  const { isLoginModalOpen, currentUser, logout, isSignedUser, setIsSignedUserData, toggleLoginModal } = useContext(MoviesContext)
  const hasData = Object.hasOwnProperty(currentUser)
  return (
    <div className='flex flex-row items-center justify-center gap-4'>
        { hasData &&
          <SVGSignIcon onClick={()=>logout({})} className='cursor-pointer'/>}
        <SVGBellIcon className='cursor-pointer'/>
        <SVGSunIcon className='cursor-pointer'/>
        { !hasData &&
          <SVGUserCircle onClick={()=>toggleLoginModal(!isLoginModalOpen)} className='cursor-pointer'/>
        }
    </div>
  )
}
