'use server'
import SVGSignIcon from '@/components/atoms/SVGSignIcon'
import SVGBellIcon from '@/components/atoms/SVGBellIcon'
import SVGSunIcon from '@/components/atoms/SVGSunIcon'
import SVGUserCircle from '@/components/atoms/SVGUserCircle'

export const RightMenu = () => {
  return (
    <div className='flex flex-row items-center justify-center gap-4'>
        <SVGSignIcon className='cursor-pointer'/>
        <SVGBellIcon className='cursor-pointer'/>
        <SVGSunIcon className='cursor-pointer'/>
        <SVGUserCircle className='cursor-pointer'/>
    </div>
  )
}
