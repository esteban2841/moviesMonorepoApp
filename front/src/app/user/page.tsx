import { Loader } from '@/components/atoms/Loader'
import { HomeSwiperSection } from '@/components/molecules/HomeSwiperSection'
import { UserSavedFavSlider } from '@/components/molecules/UserSavedFavSlider'
import { fetchDataSections, fetchUserSaved, retrieveUserById } from '@/helpers/fetch'
import { unstable_noStore as nostore } from 'next/cache'
import React, { Suspense, use } from 'react'

interface FilterProps {
  searchParams: string
}

 const Page = async ({searchParams}: FilterProps) => {
    nostore()
    const params = new URLSearchParams(searchParams);
    const id = params.get('id') || '';
    const url = `${process.env.BACKEND_URI}/movies`
    const popular = await fetchDataSections(url, 'popular')
    const upcoming = await fetchDataSections(url, 'upcoming')
    const {name: top, data: dataTop} = await fetchDataSections(url, 'top-rated')
    const {name: now, data: dataNow} = await fetchDataSections(url, 'now-playing')
    const FavSlider = await ActionRetriveUserFavorites(id)
    const topName = top && top.split('-').join(" ");
    const nowName = now && now.split('-').join(" ");


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
          <HomeSwiperSection sectionData={dataTop.results} sectionName={topName}></HomeSwiperSection>
        </Suspense>
        <Suspense fallback={
          <Loader/>
        }>
          <HomeSwiperSection sectionData={dataTop.results} sectionName={nowName}></HomeSwiperSection>
        </Suspense>
        <FavSlider/>
  
      </section>
    );
}


function ActionRetriveUserFavorites(id: string) {
  return async function myAction() {
    'use server';
    const {user} = await retrieveUserById(`${process.env.BACKEND_URI}/users`, id)
		console.log("TCL: myAction -> user", user)
    return (
      <Suspense fallback={
        <Loader/>
      }>
        <UserSavedFavSlider user={user}/>
      </Suspense>
    )
  }
  
}

export default Page
