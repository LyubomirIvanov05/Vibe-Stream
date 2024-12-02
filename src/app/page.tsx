'use client'
import NavigationBar from "./pages/NavigationBar";
import LibrarySidebar from "./pages/LibrarySidebar";
import MainContent from "./pages/MainContent";
import PlayBar from "./pages/PlayBar";
import { useState } from "react";
import SongContent from "./pages/SongContent";
import { useRouter } from "next/router";
import MusicLayout from "./pages/MusicLayout";
 
export default function Home() {

  return (
    <MusicLayout/>
  );
}
