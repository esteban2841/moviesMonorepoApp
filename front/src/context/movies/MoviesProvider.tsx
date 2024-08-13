'use client'
import React, { useReducer, useRef } from 'react'
import { MoviesContext } from './MoviesContext';
import { moviesReducer } from './moviesReducer';

export interface MoviesState {
    activeFilterName?: string,
    isLoginModalOpen?: boolean,
    signButonSelected?: string,
    sliderSections: Array<SectionRef>,
    // Methods
    toggleLoginModal?: (payload: any) => void,
    setSignButton?: (payload: any) => void,
}

export interface SectionRef {
    current: HTMLElement,
    name: string
}

const INITIAL_STATE: MoviesState = {
    sliderSections: [],
    activeFilterName: '',
    isLoginModalOpen: false,
    signButonSelected: "sign"
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

    return (
        <MoviesContext.Provider value={{
            ...state,
            //Methods
            toggleLoginModal,
            setSignButton,
            setSliderSection,
        }}>
            {children}
        </MoviesContext.Provider>
    )
}
