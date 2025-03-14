'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavigationBar from "./pages/NavigationBar";
import AlbumContextProvider, { SongContextProvider, useAlbumContext, useSongContext } from "./pages/AlbumContext";
import LibrarySidebar from "./pages/LibrarySidebar";
import MainContent from "./album/MainContent";
import SongContent from "./pages/SongContent";
import PlayBar from "./pages/PlayBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AlbumContextProvider>
          <SongContextProvider>
            <div className="flex flex-col p-2 h-screen">
              <NavigationBar/>
                <div className="flex flex-row gap-2 h-custom-85% w-full">
                  <LibrarySidebar />
                  {children}
                  <SongContent></SongContent>
                </div>
              <PlayBar></PlayBar>
            </div>
          </SongContextProvider>
        </AlbumContextProvider>
      </body>
    </html>
  );
}
