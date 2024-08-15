'use client'

import { Movie } from "@/types/movies"
import { MovieCard } from "../atoms/MovieCard"
import styled from "styled-components"
export interface MovieList  {
    movies: Array<Movie>
}


const HomeListContainer =  styled.div`
  .section-title{
    font-family: IBM Plex Sans;
    font-weight: 700;
    line-height: 28px;
    text-align: left;

  }
  .movie-title{
    
    font-family: Inter;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
  }
  p{
    //styleName: INLAZE APP/Desktop-Tablet/Títulos Terciarios;
 //styleName: INLAZE APP/Desktop-Tablet/Label;
    font-family: Inter;
    font-size: 9px;
    font-weight: 400;
    line-height: 10px;
    text-align: left;


  }
`

export const MoviesList = ({movies}: MovieList) => {
  return (
    <HomeListContainer className="w-full flex flex-row justify-center items-center p-2 flex-wrap gap-8">
        {
        
            movies.map((movie: Movie)=>{
                return (
                    <MovieCard 
                        id={movie.id} 
                        vote_average={movie.vote_average} 
                        key={movie.id} 
                        title={movie.title} 
                        poster_path={movie.poster_path} 
                        release_date={movie.release_date}
                        backdrop_path={movie.backdrop_path}
                        
                        >
                        
                    </MovieCard>
                )
            })
        }
    </HomeListContainer>
  )
}
