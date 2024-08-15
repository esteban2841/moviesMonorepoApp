import { Favorites } from '@/components/atoms/Favorites';
import { MoviesState } from './MoviesProvider'

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
			console.log("TCL: action.payload", action.payload)
            return{
                ...state,
                activeFilterName: action.payload
            }
        case 'setCurrentUser':
            return{
                ...state,
                currentUser: action.payload
            }
        case 'addFavSavedItems':
            const user = state.currentUser
            if(!user) return{
                ...state
            }
            if(action.payload.type == 'fav'){
                if(user.favorites){
                    user.favorites.push(action.payload.id)
                    return{
                        ...state,
                        currentUser: {...user}
                    }
                }
                const userMod = {
                    ...user,
                    favorites: [],
                }
                userMod.favorites.push(action.payload.id)
				console.log("TCL: userMod", userMod)
                return{
                    ...state,
                    currentUser: {...userMod}
                }
            }
            if(action.payload.type == 'sav'){
                if(user.saved){
                    user.saved.push(action.payload.id)
                    return{
                        ...state,
                        currentUser: {...user}
                    }
                }
                const userMod = {
                    ...user,
                    saved: [],
                }
                userMod.saved.push(action.payload.id)
                console.log("TCL: userMod", userMod)
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