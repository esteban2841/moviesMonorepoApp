'use client'
import React, { useReducer, useRef } from 'react'
import { MoviesContext } from './MoviesContext';
import { moviesReducer } from './moviesReducer';

export interface MoviesState {
    activeFilterName?: string,
    isLoginModalOpen?: boolean,
}

const INITIAL_STATE: MoviesState = {
    activeFilterName: '',
    isLoginModalOpen: false,
}

interface Props {
    children: React.ReactElement | React.ReactElement[] | React.ReactNode
  }

export const MoviesProvider = ({children}: Props) => {

    const [state, dispatch] = useReducer(moviesReducer, INITIAL_STATE)
    
    const toggleLoginModal = (payload: MoviesState) =>{
            
        dispatch({type: 'toggleLoginModal', payload: payload})
    }

    return (
        <MoviesContext.Provider value={{
            ...state,
            //Methods
            toggleLoginModal,
        }}>
            {children}
        </MoviesContext.Provider>
    )
}
