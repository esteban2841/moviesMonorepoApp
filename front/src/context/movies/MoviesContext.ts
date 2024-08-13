'use client'
import { createContext } from 'react'
import { MoviesState, SectionRef } from './MoviesProvider'

interface MoviesContext {
    activeFilterName?: string,
    isLoginModalOpen?: boolean,
    signButonSelected?: string,
    sliderSections: Array<SectionRef>,
    // Methods
    toggleLoginModal?: (payload: any) => void,
    setSignButton?: (payload: any) => void,
    setSliderSection?: (payload: any) => void,

}

export const MoviesContext = createContext({} as MoviesContext)