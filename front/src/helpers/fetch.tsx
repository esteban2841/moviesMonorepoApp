interface User {
  email: string,
  password: string,
}

export const fetchDataSections = async (url: string, endpoint: string) => {
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
   
    return data;
  }