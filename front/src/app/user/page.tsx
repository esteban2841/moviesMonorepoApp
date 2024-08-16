import { Loader } from '@/components/atoms/Loader'
import { HomeSwiperSection } from '@/components/molecules/HomeSwiperSection'
import { UserSavedFavSlider } from '@/components/molecules/UserSavedFavSlider'
import { fetchDataSections, retrieveUserById } from '@/helpers/fetch'
import { unstable_noStore as nostore } from 'next/cache'
import React, { Suspense } from 'react'

interface FilterProps {
  searchParams: object
}

 const Page = async ({searchParams}: FilterProps) => {
    nostore()
    const params = new URLSearchParams(searchParams);
    const id = params.get('id');
		console.log("TCL: Page -> id", id)
    const url = 'http://localhost:8000/movies'
    const popular = await fetchDataSections(url, 'popular')
    const upcoming = await fetchDataSections(url, 'upcoming')
    const topRated = await fetchDataSections(url, 'top-rated')
    const nowPlaying = await fetchDataSections(url, 'now-playing')
    const user = await retrieveUserById('http://localhost:8000/users', id)
		console.log("TCL: Page -> user", user)


    
       return (
      <section className="w-full relative overflow-hidden h-full flex flex-col gap-4 items-center justify-between p-4">
        <Suspense fallback={
          <Loader/>
        }>
          <HomeSwiperSection sectionData={popular.data.results} sectionName={popular.name}></HomeSwiperSection>
        </Suspense>
        <Suspense fallback={
          <Loader/>
        }>
          <HomeSwiperSection  sectionData={upcoming.data.results} sectionName={upcoming.name}></HomeSwiperSection>
        </Suspense>
        <Suspense fallback={
          <Loader/>
        }>
          <HomeSwiperSection sectionData={topRated.data.results} sectionName={topRated.name.split('-').join(" ") }></HomeSwiperSection>
        </Suspense>
        <Suspense fallback={
          <Loader/>
        }>
          <HomeSwiperSection sectionData={nowPlaying.data.results} sectionName={nowPlaying.name.split('-').join(" ") }></HomeSwiperSection>
        </Suspense>
        <Suspense fallback={
          <Loader/>
        }>
          <UserSavedFavSlider user={user} />
        </Suspense>
  
      </section>
    );
}

export default Page
