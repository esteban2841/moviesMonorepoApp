interface User {
  email?: string
  password?: string
  favorites?: Array<number>
  id?: string
  _id?: string
  __v?: number
  saved?: Array<number>,
}

export const fetchDataSections = async (url: string, endpoint?: string) => {

    const res = await fetch(`${url}/${endpoint}`)
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    const {data} = await res.json()
    const sectionData = {
      name: endpoint,
      data
    }
    return sectionData
  }
export const fetchUserSaved = async (url: string, user: User, endpoint?: string) => {

    const { saved} = user
    if(saved){
      
      const res = await fetch(`${url}/saved`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ',
        },
        body: JSON.stringify(saved)
      })
     
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
     
      const {data} = await res.json()
			console.log("TCL: fetchUserSaved -> data", data)
			return  {
        sectionName: 'saved',
        sectionData: [...data]
      }
    }
  }
export const fetchUserFavorites = async (url: string, user: User, endpoint?: string) => {

    const {favorites} = user
    
    const favoritesSlider = {
      sectionName: 'favorites',
      data: []
    }
    
    if(favorites){
      
      const res = await fetch(`${url}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ',
        },
        body: JSON.stringify(favorites)
      })
      
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
     
      const {data} = await res.json()
      return {
        sectionName: 'favorites',
        sectionData: [ ...data]
    }
    }
  }
export const fetchMovies = async (url: string, page?: string) => {
    const res = await fetch(`${url}?${page}`)
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    const {data} = await res.json()
   
    return data
  }
export const getMovieByid = async (url: string, id?: string) => {
    const res = await fetch(`${url}?${id}`)
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    const {data} = await res.json()
   
    return data
  }
export const createUser = async (url: string, endpoint: string, userData: User) => {
  const res = await fetch(`${url}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ',
    },
    body: JSON.stringify(userData)
  })
  const data = await res.json() 
  
  if (!res.ok) {
    throw new Error(data.message)
  }
   
    return data;
  }

  export const updateUser = async (url: string, endpoint: string, userData?: User) => {
    const res = await fetch(`${url}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
      },
      body: JSON.stringify(userData)
    })
    const data = await res.json() 
    
    if (!res.ok) {
      throw new Error(data.message)
    }
     
      return data;
    }
  
export const retrieveUser = async (url: string, endpoint: string) => {
  const res = await fetch(`${url}/${endpoint}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ',
    }
  })
  const data = await res.json() 
  
  if (!res.ok) {
    throw new Error(data.message)
  }
   
    return data
}

  export const retrieveUserById = async (url: string, _id?: string) => {
    const res = await fetch(`${url}/section?_id=${_id}`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    const data = await res.json()
		console.log("TCL: retrieveUserById -> data", data)
   
    return data
  }
