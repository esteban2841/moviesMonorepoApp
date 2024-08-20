import { MoviesState, User } from './MoviesProvider'
import { updateUser } from '@/helpers/fetch';

export const moviesReducer = (state: MoviesState, action: any) : MoviesState => {
    switch (action.type) {
        case 'toggleLoginModal':
            return{
                ...state,
                isLoginModalOpen: action.payload
            }
        case 'setSignButton':
            return{
                ...state,
                signButonSelected: action.payload
            }
        case 'setActiveFilter':
            return{
                ...state,
                activeFilterName: action.payload
            }
        case 'setCurrentUser':
            return{
                ...state,
                currentUser: action.payload,
                isSignedUser: true
            }
        case 'logout':
            return{
                ...state,
                currentUser: action.payload
            }
        case 'setIsSignedUserData':
            return{
                ...state,
                isSignedUser: action.payload
            }
        case 'addFavSavedItems':
            const user = state.currentUser
            const url = `${process.env.BACKEND_URI}/users`
            if(!user) return{
                ...state
            }
            if(action.payload.type == 'fav'){
                if(user.favorites){
                    user.favorites.push(action.payload.id)
                    updateUser(url, 'update', user)
                    return{
                        ...state,
                        currentUser: {...user}
                    }
                }
                const userMod: User = {
                    ...user,
                    favorites: [],
                }
				console.log("TCL: action.payload", action.payload)
                userMod.favorites?.push(action.payload.id)
                updateUser(url, 'update', userMod)
                return{
                    ...state,
                    currentUser: {...userMod}
                }
            }
            if(action.payload.type == 'sav'){
                if(user.saved){
                    user.saved.push(action.payload.id)
                    updateUser(url, 'update', user)
                    return{
                        ...state,
                        currentUser: {...user}
                    }
                }
                const userMod : User
                 = {
                    ...user,
                    saved: [],
                }
                userMod.saved?.push(action.payload.id)
                updateUser(url, 'update', userMod)
                
                return{
                    ...state,
                    currentUser: {...userMod}
                }
            }
            
            
        case 'setSliderSections':
            const payload = action.payload
            const currentSliderSectionsState = [...state.sliderSections]
            const sectionFiltered = [...currentSliderSectionsState].filter(section=>{
                return section.name == payload.name
            })
            if(!sectionFiltered.length){
                currentSliderSectionsState.push(action.payload) 
                return ({
                    ...state,
                    sliderSections: [...currentSliderSectionsState]
                })
            }
            if(sectionFiltered.length){
                const sliderSections = [...currentSliderSectionsState].filter(section=>{
                    return section.name !== payload.name
                })
                sliderSections.push(payload)
                return {
                    ...state,
                    sliderSections: [...sliderSections]
                }

            }
        default:
            return state
    } 
}