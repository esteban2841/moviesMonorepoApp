import { MovieHomeCardProps } from "@/types/movies"
import Image from "next/image"
import moment from "moment"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const MovieCard = ({title, release_date, vote_average, poster_path, id} : MovieHomeCardProps) => {
    const baseImageUrl = 'https://image.tmdb.org/t/p/w220_and_h330_face'
    const beautifyDate = moment(release_date).format('MMMM Do YYYY')
    const dateArray = beautifyDate.split(' ')
    const [month, day, year] = dateArray
    const quality = (vote_average*10).toFixed(2)

    const handleImageErrors = ()=>{
        // e.target.onerror = null; // Prevents infinite loop in case the default image fails to load
        // e.target.src = defaultImgUrl;h
    }
  return (
    <div id={id.toString()} key={id} className="flex flex-col overflow-hidden gap-2 rounded-lg w-[200px] movie-card bg-[#262626]">
        <figure>
            <div className="header-movies-card">
                <Image onError={handleImageErrors} className="object-fill"
                src={`${baseImageUrl}${poster_path}`} height={200} width={200} alt={title}/>

            </div>
            <div className="flex footer-movies-card justify-center p-4 flex-col gap-2 w-full h-[130px] w-full">
                <figcaption>
                    <h5 className="movie-title whitespace-nowrap overflow-hidden text-ellipsis">{title}</h5>
                </figcaption>
                <p className={`${title}-release-date release-date`} >{`${month} ${day}, ${year}`}</p>
                <div className="flex flex-col items-center justify-center w-[70px] h-[80px] py-2 gap-2 left-2">
                    <p>Rating</p>
                    <CircularProgressbar styles={
                        buildStyles({
                            strokeLinecap: 'butt',
                            textSize: '16px',
                            strokeWidth: '4',
                            background: '#4DA14F',
                            pathTransitionDuration: 0.5,
                            textColor: '#fff',
                            trailColor: 'rgb(38, 80, 39, 0.4)',
                            backgroundColor: '#4DA14F',
                            pathColor: `#4DA14F`
                        })
                    } maxValue={10} value={Math.ceil(vote_average)} text={`${Number(quality).toFixed(0)}%`} />
                </div>
            </div>
        </figure>
    </div>
  )
}
