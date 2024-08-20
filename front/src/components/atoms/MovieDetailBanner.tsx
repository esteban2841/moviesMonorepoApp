'use client'
import moment from "moment"
import Image from "next/image"
import styled from "styled-components"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Bookmark from '@/components/atoms/Bookmark'
import ShareIcon from '@/components/atoms/ShareIcon'
import FavoritesSVG from '@/components/atoms/FavoritesSVG'
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movies";

interface MovieDetailProp{
    url: string
}

const MovieDetailContainer = styled.div<MovieDetailProp>`
    background: url(${props => (props.url)});
    background-repeat: repeat;
    background-size: contain;
    background-clip: border-box;
    .editor text{
        right: 5% !important;
    }
`

export const MovieDetailBanner = ({runtime, overview, genres, 
    backdrop_path, title, release_date,
      vote_average, poster_path, adult, id,original_language,original_title,popularity,video,vote_count}: Movie) => {
    const router = useRouter()
    const baseImageUrl = 'https://image.tmdb.org/t/p/w220_and_h330_face'
    const beautifyDate = moment(release_date).format('MMMM Do YYYY')
    const dateArray = beautifyDate.split(' ')
    const [month, day, year] = dateArray
    const quality = (vote_average*10).toFixed(2)

    const handleNavi = ()=>{
        router.push('/')
    }

    return (
    <MovieDetailContainer url={baseImageUrl + backdrop_path} className={`relative w-full h-[600px] flex shadow-2xl shadow-inner shadow-black flex-row items-center justify-center p-6`}>
        <div className="overlay w-full h-full absolute bg-[#000] opacity-40 z-10"></div>
        <div className="relative p-2 gap-2 flex z-20 h-full flex-col w-1/4 items-center justify-center ">
            <button onClick={handleNavi} className="absolute flex  text-[white] left-0 top-0 w-[30px]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <Image width={300} height={400} src={`${baseImageUrl}${poster_path}`} alt={title} />
            <button className="w-full py-2 px-4 bg-[#e6a713] text-[white]">
                <h6 className="font-medium">
                    Oficial Trailer
                </h6>
            </button>
        </div>
        <div className="z-20 relative h-full p-2 flex flex-col w-3/4 gap-4 justify-center">
            <h2 className="text-3xl font-extrabold w-2/4">{`${title} ${moment(release_date).year()}`}</h2>
            <div className="flex flex-row justify-between items-center w-2/4">
                <p className="text-sm">{`${month} ${day}, ${year}.`}</p>
                <p>{runtime}</p>
            </div>
            <h2 className="text-2xl font-bold">Overview: </h2>
            <p>{overview}</p>
            <div className="flex flex-col justify-center items-center footer w-full gap-4 p-4">
                <div className="w-full flex justify-between items-center">
                    <div className="flex flex-row items-center gap-2 justify-center w-[150px]">
                        <CircularProgressbar className="editor" styles={
                            buildStyles({
                                strokeLinecap: 'butt',
                                textSize: '40px',
                                pathTransitionDuration: 0.5,
                                textColor: '#fff',
                                trailColor: 'rgb(38, 80, 39, 0.4)',
                                backgroundColor: '#4DA14F',
                                pathColor: `#4DA14F`,
                            })
                        } maxValue={10} value={Math.ceil(vote_average)} text={`${Number(quality).toFixed(0)}%`} />
                        <h6>Users score</h6>
                    </div>
                    <div className="flex flex-row items-center gap-10 justify-center w-[150px] icons">
                        <FavoritesSVG width="30px"/>
                        <Bookmark width="80px"/>
                        <ShareIcon width="30px"/>
                    </div>

                </div>
                <div className="flex flex-row items-center gap-4 justify-center w-full">
                    <div className="w-full flex flex-row gap-2 flex-wrap justify-center items-center">
                    {
                        genres?.map(g=>{
                            return (
                                    <div key={g.id} className="border-solid cursor-pointer rounded py-1 px-4 text-[#4DA14F] border-2 border-[#4DA14F]  ">
                                        <h6 className="font-bold">{g.name}</h6>
                                    </div>
                                )
                            })
                    }
                    </div>
                </div>


            </div>
        </div>
    </MovieDetailContainer>
  )
}
