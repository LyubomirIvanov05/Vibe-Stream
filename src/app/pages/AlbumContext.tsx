"use client"

import { Album } from '@/types/album';
import { Song } from '@/types/song';
import { createContext, useState, useContext, ReactNode } from 'react';

interface AlbumContextProps {
  album: Album; // The current album object
  setAlbum: (album: Album) => void; // Function to update the album
}

interface songContextPage {
  song: Song; // The current album object
  setSong: (song: Song) => void; // Function to update the album
}

export const AlbumContext = createContext<AlbumContextProps>({
  album: {
    id: 0,
    name: "",
    release_date: "",
    genre: "",
    cover_image_url: "",
    total_duration: 0,
    artist_id: undefined, // Optional field as per your interface
  },
  setAlbum: () => {}, // No-op function as default
});

export const SongContext = createContext<songContextPage>({
  song: {
    id: 0,
    name: '',
    album_id: undefined,
    artist_id: undefined, 
    duration: 0,
    mp3_url: '',
    img_url: undefined,
    track_number: undefined,
    plays: 0,
    type: '',
    genre: '',
    release_date: '' 
  },
  setSong: () => {}, // No-op function as default
});

type AlbumProviderProps = {
  children: ReactNode;
};



export function AlbumContextProvider({ children }: { children: ReactNode }) {
  const [album, setAlbum] = useState<Album>({
    id: 0,
    name: "",
    release_date: "",
    genre: "",
    cover_image_url: "",
    total_duration: 0,
    artist_id: undefined,
  });

  return (
    <AlbumContext.Provider value={{ album, setAlbum }}>
      {children}
    </AlbumContext.Provider>
  );
}

// Provider for SongContext
export function SongContextProvider({ children }: { children: ReactNode }) {
  const [song, setSong] = useState<Song>({
    id: 0,
    name: "",
    album_id: undefined,
    artist_id: undefined,
    duration: 0,
    mp3_url: "",
    img_url: undefined,
    track_number: undefined,
    plays: 0,
    type: "",
    genre: "",
    release_date: "",
  });

  return (
    <SongContext.Provider value={{ song, setSong }}>
      {children}
    </SongContext.Provider>
  );
}

// Hooks for consuming contexts
export function useAlbumContext() {
  const context = useContext(AlbumContext);
  if (!context) {
    throw new Error("useAlbumContext must be used within AlbumContextProvider");
  }
  return context;
}

export function useSongContext() {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSongContext must be used within SongContextProvider");
  }
  return context;
}
export default AlbumContextProvider;