import { ReactNode, useState } from "react";
import NavigationBar from "./NavigationBar";
import LibrarySidebar from "./LibrarySidebar";
import MainContent from "./MainContent";
import SongContent from "./SongContent";
import PlayBar from "./PlayBar";
import AlbumContentPage from "./AlbumContentPage";
import Link from 'next/link'

export default function MusicLayout(){
    const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
    const [currentAlbumId, setCurrentAlbumId] = useState<number | null>(null);




    return(<>
        <div className="flex flex-col p-2 h-screen">
        <NavigationBar></NavigationBar>
      <div className="flex flex-row gap-2 h-custom-85%">
        <LibrarySidebar setSelectedSongId={setSelectedSongId}></LibrarySidebar>
        {currentAlbumId ? (
          <AlbumContentPage albumId={currentAlbumId} setCurrentAlbumId={setCurrentAlbumId}></AlbumContentPage>
        ) : (
          <MainContent setCurrentAlbumId={setCurrentAlbumId}></MainContent>
            
        )}
        
        <SongContent selectedSongId={selectedSongId}></SongContent>

      </div>
        <PlayBar selectedSongId={selectedSongId}></PlayBar>
    </div>
    </>)
}