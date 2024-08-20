import { Loader } from "@/components/atoms/Loader";
import { HomeSwiperSection } from "@/components/molecules/HomeSwiperSection";
import { fetchDataSections, fetchMovies } from "@/helpers/fetch";
import { Suspense } from "react";
import { unstable_noStore as noStore } from 'next/cache';



export default async function Home() {
  noStore()
  const url = `${process.env.BACKEND_URI}/movies`
	console.log("TCL: Home -> url", url)
  const popular = await fetchDataSections(url, 'popular')
  const upcoming = await fetchDataSections(url, 'upcoming')
  const {name: top, data: dataTop} = await fetchDataSections(url, 'top-rated')
  const {name: now, data: dataNow} = await fetchDataSections(url, 'now-playing')
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
        <HomeSwiperSection sectionData={dataNow.results} sectionName={nowName}></HomeSwiperSection>
      </Suspense>

    </section>
  );
}
