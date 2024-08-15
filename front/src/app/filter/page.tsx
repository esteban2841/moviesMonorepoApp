'use server'

import { Loader } from '@/components/atoms/Loader'
import { MoviesList } from '@/components/molecules/MoviesList'
import { fetchMovies } from '@/helpers/fetch'
import { Movie } from '@/types/movies'
import React, { Suspense } from 'react'
import { unstable_noStore as noStore } from 'next/cache';

interface FilterProps {
    searchParams: object
}

 const Page = async ({searchParams}: FilterProps) => {
    noStore();
    const url = 'http://localhost:8000/movies'
    const discover = await fetchMovies(url, '1')
    const discover2 = await fetchMovies(url, '2')
    const discover3 = await fetchMovies(url, '3')
  
    const allMovies : Array<Movie> = [...discover.results, ...discover2.results, ...discover3.results]
	console.log("TCL: Page -> allMovies", allMovies.length)

    const params = new URLSearchParams(searchParams);
    const userFilterSelection = params.get('genre');
    const filteredData = [...allMovies].filter(movie=>{
        const filteredMovie = movie.genre_ids
        const isSameGenre = filteredMovie.includes(Number(userFilterSelection))
        return isSameGenre
    })
    
    return (
        <div className='w-full relative overflow-hidden h-full flex flex-col gap-4 items-center justify-between p-4'>
            
            <Suspense fallback={
                <Loader/>
            }>
                <MoviesList movies={filteredData} />
            </Suspense>
        </div>
    )
}


export default Page