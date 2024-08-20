'use client'
import React, { useReducer, useRef } from 'react'
import { MoviesContext } from './MoviesContext';
import { moviesReducer } from './moviesReducer';

export interface MoviesState {
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

export interface User {
    email?: string
    password?: string
    favorites?: Array<number>
    id?: string
    _id?: string
    __v?: number
    saved?: Array<number>,
}

export interface SectionRef {
    current: HTMLElement,
    name: string
}

const INITIAL_STATE: MoviesState = {
    sliderSections: [],
    activeFilterName: '',
    isLoginModalOpen: false,
    signButonSelected: "sign",
    currentUser: {},
    isSignedUser: false
}

interface Props {
    children: React.ReactElement | React.ReactElement[] | React.ReactNode
  }

export const MoviesProvider = ({children}: Props) => {

    const [state, dispatch] = useReducer(moviesReducer, INITIAL_STATE)
    
    const toggleLoginModal = (payload: MoviesState) =>{
            
        dispatch({type: 'toggleLoginModal', payload: payload})
    }
    const setSignButton = (payload: MoviesState) =>{
            
        dispatch({type: 'setSignButton', payload: payload})
    }
    const setSliderSection = (payload: MoviesState) =>{
            
        dispatch({type: 'setSliderSections', payload: payload})
    }
    const setActiveFilter = (payload: MoviesState) =>{
            
        dispatch({type: 'setActiveFilter', payload: payload})
    }
    const setCurrentUser = (payload: MoviesState) =>{
            
        dispatch({type: 'setCurrentUser', payload: payload})
    }
    const addFavSavedItems = (payload: MoviesState) =>{
            
        dispatch({type: 'addFavSavedItems', payload: payload})
    }
    const logout = (payload: MoviesState) =>{
            
        dispatch({type: 'logout', payload: payload})
    }
    const setIsSignedUserData = (payload: MoviesState) =>{
            
        dispatch({type: 'setIsSignedUserData', payload: payload})
    }

    return (
        <MoviesContext.Provider value={{
            ...state,
            //Methods
            toggleLoginModal,
            setSignButton,
            setSliderSection,
            setActiveFilter,
            setCurrentUser,
            addFavSavedItems,
            logout,
            setIsSignedUserData
        }}>
            {children}
        </MoviesContext.Provider>
    )
}
