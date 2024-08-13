import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavSectionElements } from "@/components/atoms/NavSectionElements";
import { RightMenu } from "@/components/molecules/RightMenu";
import { AsideFiltersSectionComponent } from "@/components/molecules/AsideFiltersSectionComponent";
import { ModalSign } from "@/components/molecules/ModalSign";
import StyledComponentsRegistry from '../helpers/registry'
import { MoviesProvider } from "@/context/movies/MoviesProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inlaze movies",
  description: "The best movies application available in the market, sign in and enjoy watching your favorites movies, series and more than that in our platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' ' + 'w-full box-border relative'}>
        <MoviesProvider>

          <StyledComponentsRegistry>
            <ModalSign></ModalSign>
            <nav className="w-full text-[#F6F6F6] flex flex-row justify-between items-center px-10 bg-[#000]">
              <NavSectionElements></NavSectionElements>
              <RightMenu></RightMenu>
            </nav>
            <main className="w-full relative h-full flex box-border flex-row justify-center text-[#F6F6F6]">
              <AsideFiltersSectionComponent></AsideFiltersSectionComponent>
              {children}
            </main>
          </StyledComponentsRegistry>
        </MoviesProvider>
      </body>
    </html>
  );
}
