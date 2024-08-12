import { MoviesState } from './MoviesProvider'

type MovieAction = {
    type: string,
    payload: any
}

export const moviesReducer = (state: MoviesState, action: any) : MoviesState => {
    switch (action.type) {
        case 'toggleLoginModal':
            return{
                ...state,
                isLoginModalOpen: action.payload
            }
        default:
            return state
    } 
}