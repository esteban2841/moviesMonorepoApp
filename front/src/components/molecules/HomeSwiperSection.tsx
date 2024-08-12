'use client'
import 'swiper/css';

import { Swiper, SwiperSlide } from "swiper/react";
import { MovieCard } from '../atoms/MovieCard';
import { useEffect, useRef, useState } from 'react';
import { Movie, SwiperHomeProps } from '@/types/movies';
import styled from 'styled-components';

const SwiperContainer =  styled.div`
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

const debounceFn = (cb: ()=>void, interval: number)=>{
  let debounce
    clearTimeout(debounce)
    debounce = setTimeout(() => {
      cb()
  }, interval)
}

export const HomeSwiperSection = ({sectionName, sectionData}: SwiperHomeProps) => {
  const [ data, setData] = useState([])
  const sectionSlider = useRef(null)
  const firstComputedWidth = window.screen.width > 1600
  const [slidesPerPage, setSlidesPerPage] = useState(firstComputedWidth ? 7 : 5)
  const calcSlidesPerPage = ()=>{
    const screenSize = sectionSlider.current?.offsetWidth 
    const slides = screenSize / 250
    console.log("TCL: calcSlidesPerPage -> slides", slides)
    setSlidesPerPage(slides)
  }
  

    
    useEffect(()=>{
      setData(sectionData)
      window.addEventListener('resize', ()=>{
        debounceFn(calcSlidesPerPage, 200)
      })
      return ()=>{
        window.removeEventListener('resize', ()=>{
          
        })
        
      }
    }, [])

    

    return (
        <div className={`w-full flex flex-col gap-4 section-${sectionName} overflow-hidden`}>
          <h1 className='section-title text-lg capitalize' >{sectionName && sectionName}</h1>
          <SwiperContainer ref={sectionSlider} className={`flex w-full flex-row section-slider section-slider-${sectionName}`} >

            <Swiper
            className='flex w-full flex-row container-swiper'
            spaceBetween={30}
            slidesPerView={slidesPerPage}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            
          >
              
                {
                  data?.map((movie: Movie)=>{
                    return (
                      <SwiperSlide key={movie.id} className='flex' >
                        <MovieCard 
                          id={movie.id} 
                          vote_average={movie.vote_average} 
                          key={movie.id} title={movie.title} 
                          poster_path={movie.poster_path} 
                          release_date={movie.release_date}
                          backdrop_path={movie.backdrop_path}
                          >
                          
                        </MovieCard>
                      </SwiperSlide>
                  )
                  })
                }
            {/* Add more slides as needed */}
          </Swiper>
          </SwiperContainer>
        </div>
      );
}
