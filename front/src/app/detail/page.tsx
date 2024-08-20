import { MovieDetailBanner } from "@/components/atoms/MovieDetailBanner";
import { fetchDataSections, fetchMovies } from "@/helpers/fetch"
import { unstable_noStore as noStore } from 'next/cache';

const Page = async ({searchParams}: any) => {
    noStore();
    
    const url = `${process.env.BACKEND_URI}/movies`
    const { data} = await fetchDataSections(url, 'genres')
    const params = new URLSearchParams(searchParams)
    const movieId = params.get('movieId') || ''
    const fetchMovieDetailUrl = `${process.env.BACKEND_URI}/movies/movie`
    const movieDetail = await fetchMovies(fetchMovieDetailUrl, movieId)
    return (
        <div className="w-full flex flex-col jusify-center items-center" >
            <MovieDetailBanner  
                title={movieDetail.title} 
                poster_path={movieDetail.poster_path}
                release_date={movieDetail.release_date}
                vote_average={movieDetail.vote_average}
                id={movieDetail.id}
                backdrop_path={movieDetail.backdrop_path}
                adult={movieDetail.adult}
                genres={movieDetail.genres}
                original_title={movieDetail.original_title}
                overview={movieDetail.overview}
                popularity={movieDetail.popularity}
                vote_count={movieDetail.vote_count}
                runtime={movieDetail.runtime}
            />
        </div>
    )
}

export default Page
