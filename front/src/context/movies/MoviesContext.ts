'use client'
import { createContext } from 'react'
import { MoviesState } from './MoviesProvider'

interface MoviesContext {
    activeFilterName?: string,
    isLoginModalOpen?: boolean,
    // Methods
    toggleLoginModal?: (payload: any) => void,

}

export const MoviesContext = createContext({} as MoviesContext)