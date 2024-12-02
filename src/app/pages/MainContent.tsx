'use client'
import songs from "../../songs.json";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Song } from "@/types/song";
import { Artist } from "@/types/artist";
import { Album } from "@/types/album";

export default function MainContent({ setCurrentAlbumId, }: { setCurrentAlbumId: Dispatch<SetStateAction<number | null>>}) {

    const [activeFilter, setActiveFilter] = useState("Everyone");
    const [albums, setAlbums] = useState<Album[]>([]);
    const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [hoveredContent, setHoveredContent] = useState<number | null>(null);

    useEffect(() => {
        async function fetchSongs() {
          try {
            const response = await fetch('/api/songs');
            const data = await response.json();

            setAlbums(data.albums);
            setFilteredAlbums(data.albums);
          } catch (error) {
            console.error('Error fetching songs:', error);
          }
        }
    
        fetchSongs();
      }, []);

      const filterContent = (filter: string) => {
        setActiveFilter(filter);

        if (activeFilter === "Music") {
            setFilteredAlbums(albums);
        } else if (activeFilter === "Everyone") {
            setFilteredAlbums(albums);
        }
      }

      const handleAlbumClick = (album: Album) => {
        setSelectedAlbum(album);
      }




    const showAll = () => {
        setAlbums(albums);

        setActiveFilter("Everyone")
    }

    // const showAlbums = () => {   
    //     const albums =albums.filter((album) => song.type === "Album");
    //     setFilteredSongs(albums);
    //     setActiveFilter("Albums")
    // }

    const showMusic = () => {
        setAlbums(albums);
        setActiveFilter("Music");
    }



    return(
        <div className="bg-component_bg w-custom-640 p-4 h-full rounded-md">
            <ul className="flex flex-row gap-2 mb-4">
                <button
                    className={`border rounded-3xl py-1 px-4 text-sm ${activeFilter === "Everyone" ? "bg-white text-black" : "text-white"}`}
                    onClick={() => filterContent("Everyone")}>
                    Everyone
                </button>

                <button 
                    className={`border rounded-3xl py-1 px-4 text-sm ${activeFilter === "Music" ? "bg-white text-black" : "text-white"}`}
                    onClick={() => filterContent("Music")}>
                    Music
                </button>

                <button className={`border rounded-3xl py-1 px-4 text-sm ${
                    activeFilter === "Podcasts" ? "bg-white text-black" : "text-white"}`}
                onClick={() => filterContent("Podcasts")}>Podcasts</button>

                 <button className={`border rounded-3xl py-1 px-4 text-sm ${
                    activeFilter === "Audiobooks" ? "bg-white text-black" : "text-white"}`}
                onClick={() => filterContent("Audiobooks")}>Audiobooks</button>
            </ul>
            <div className="grid grid-cols-2 grid-rows-4 gap-2">
                {filteredAlbums.slice(0, 8).map((album) => (
                    <li key={album.id} className={`list-none flex flex-row gap-2 items-center relative rounded-md overflow-hidden ${
                        hoveredContent === album.id ? "bg-red-950" : "bg-song_bg"}`} 
                        onMouseEnter={() => setHoveredContent(album.id)} onMouseLeave={() => setHoveredContent(null)}
                        onClick={() => handleAlbumClick(album)}>
                        {hoveredContent === album.id ? (
                            <div className="flex flex-row items-center gap-2" onClick={() => setCurrentAlbumId(album.id)}>
                                <img src={album.cover_image_url} alt={album.name} width={48} height={48}/>
                                <h2>{album.name}</h2>
                                <img src="playButton.svg" alt="Play button" className="w-8 absolute right-2 hover:scale-110"/>
                            </div>
                        ): (
                            <div className="flex flex-row items-center gap-2">
                                <img src={album.cover_image_url} alt={album.name} width={48} height={48}/>
                                <h2 className="text-white">{album.name}</h2>
                            </div>
                        )}
                                
                    </li>
                ))}      
            </div>
            
        </div>
    );
}