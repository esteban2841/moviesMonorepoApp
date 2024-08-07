import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavSectionElements } from "@/components/atoms/NavSectionElements";
import { RightMenu } from "@/components/molecules/RightMenu";

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
      <body className={inter.className + ' ' + 'h-screen w-full'}>
      <nav className="w-full flex flex-row justify-between items-center px-10 bg-[#000]">
          <NavSectionElements></NavSectionElements>
          <RightMenu></RightMenu>
        </nav>
          {children}
      </body>
    </html>
  );
}
