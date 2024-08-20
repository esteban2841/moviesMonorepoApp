'use server'

import { Loader } from '@/components/atoms/Loader'
import { MoviesList } from '@/components/molecules/MoviesList'
import { fetchMovies } from '@/helpers/fetch'
import { Genres, Movie } from '@/types/movies'
import React, { Suspense } from 'react'
import { unstable_noStore as noStore } from 'next/cache';

interface FilterProps {
    searchParams: string
}

 const Page = async ({searchParams}: FilterProps) => {
    noStore();
    const url = `${process.env.BACKEND_URI}/movies`
    const discover = await fetchMovies(url, '1')
    const discover2 = await fetchMovies(url, '2')
    const discover3 = await fetchMovies(url, '3')
  
    const allMovies : Array<Movie> = [...discover.results, ...discover2.results, ...discover3.results]

    const params = new URLSearchParams(searchParams);
    const userFilterSelection = params.get('genre');
    const filteredData = [...allMovies].filter((movie: Movie) =>{
        const filteredMovie = movie.genres
        const id : number = Number(userFilterSelection);
        const isSameGenre = (id: Genres) :boolean => filteredMovie.includes(id);
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