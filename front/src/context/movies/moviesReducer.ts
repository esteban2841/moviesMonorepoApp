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