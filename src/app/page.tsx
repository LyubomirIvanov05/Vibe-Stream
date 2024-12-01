'use client'
import NavigationBar from "./pages/NavigationBar";
import LibrarySidebar from "./pages/LibrarySidebar";
import MainContent from "./pages/MainContent";
import PlayBar from "./pages/PlayBar";
import { useState } from "react";
import { Song } from "@/types/song";


export default function Home() {
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);


  return (
    <div className="flex flex-col p-2 h-screen">
        <NavigationBar></NavigationBar>
      <div className="flex flex-row gap-2 h-full">
        <LibrarySidebar setSelectedSongId={setSelectedSongId}></LibrarySidebar>
        <MainContent></MainContent>
        <LibrarySidebar setSelectedSongId={setSelectedSongId}></LibrarySidebar>
      </div>
        <PlayBar selectedSongId={selectedSongId}></PlayBar>
    </div>
  );
}
