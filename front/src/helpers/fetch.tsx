export const fetchDataSections = async (url: string, endpoint: string) => {
    const res = await fetch(`${url}/${endpoint}`)
    console.log("TCL: fetchDataSections -> res", res)
   
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