'use client'
import { createContext } from 'react'
import { SectionRef, User } from './MoviesProvider'

export interface MoviesContext {
    activeFilterName?: string,
    isLoginModalOpen?: boolean,
    signButonSelected?: string,
    sliderSections: Array<SectionRef>,
    currentUser: User | null,
    isSignedUser: boolean,
    // Methods
    toggleLoginModal?: (payload: any) => void,
    setSignButton?: (payload: any) => void,
    setSliderSection?: (payload: any) => void,
    setActiveFilter?: (payload: any) => void,
    setCurrentUser?: (payload: any) => void,
    addFavSavedItems?: (payload: any) => void,
    logout?: (payload: any) => void,
    setIsSignedUserData?: (payload: any) => void,

}

export const MoviesContext = createContext({} as MoviesContext)