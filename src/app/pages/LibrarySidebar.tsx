'use client'
import { useState, useEffect, useRef } from "react";
import PlayBar from "./PlayBar";
import { Song } from "@/types/song";
import { Artist } from "@/types/artist";





export default function LibrarySidebar({ setSelectedSongId }: { setSelectedSongId: (id: number) => void }) {
    const [songs, setSongs] = useState<Song[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [filteredAritsts, setFilteredArtists] = useState(artists);
    const [filteredSongs, setFilteredSongs] = useState(songs);
    const [isFiltered, setIsFiltered] = useState(false);
    const [hoveredSong, setHoveredSong] = useState(-1);

    useEffect(() => {
        async function fetchSongs() {
          try {
            const response = await fetch('/api/songs');
            const data = await response.json();

            setSongs(data.songs);
            setFilteredSongs(data.songs);

            setArtists(data.artists);
            setFilteredArtists(data.artists);
          } catch (error) {
            console.error('Error fetching songs:', error);
          }
        }
    
        fetchSongs();
      }, []);




    const getArtistName = (artists_id: number) => {
        const artist = artists.find((artist) => artist.id === artists_id);
        return artist ? artist.name : "Unknown Artist";
    }


    const showAlbums = () => {
        const albums =songs.filter((song) => song.type === "Album");
        setFilteredSongs(albums);
        setIsFiltered(true);
    }

    const showAll = () => {
        setFilteredSongs(songs);
        setIsFiltered(false);
    }


    const handleSelectSong = (id: number) => {
        setSelectedSongId(id);
    };
    //px-16 py-12

    return(
        <div className="bg-component_bg px-3 py-5 flex flex-col gap-4 h-full w-custom-420 rounded-md overflow-auto">
            <div className="flex flex-row gap-4 px-2">
                <img src="library.svg" alt="Library Logo" className="w-6"/>
                <h1 className="font-bold text-your_library hover:text-white transition-colors duration-300 ease-in-out">Your library</h1>
            </div>
            {isFiltered ? (
                <div className="flex flex-row gap-2 px-2">
                  <button onClick={showAll} className="bg-button_bg rounded-full flex items-center justify-center w-7 h-7">
                      <img src="close.svg" alt="Close button" className="w-5 h-5" />
                  </button>
                  <button className="bg-white rounded-3xl py-1 px-4 text-sm text-black" onClick={showAlbums}>Playlists</button>
                </div>
                ) : 
                (
                <div className="flex flex-row gap-4 px-2">
                    <button className="bg-button_bg rounded-3xl py-1 px-4 text-sm" onClick={showAlbums}>Playlists</button>
                 </div>
                )}
            
            
            <ul className="flex flex-col gap-1 overflow-auto">
                {filteredSongs.map((song) =>(
                    <li key={song.id} className={`flex flex-row gap-4 p-2 rounded ${
                        hoveredSong === song.id ? "bg-side_hovered_song" : "bg-inherit"
                    }`}
                    onMouseEnter={() => setHoveredSong(song.id)} onMouseLeave={() => setHoveredSong(-1)}>
                       {hoveredSong === song.id ? 
                       (<>
                            <div className="relative">
                                <img src={song.img_url} alt={song.name} width={48} height={48} className="rounded"/>
                                <button className="absolute w-4 top-3 left-4 hover:scale-110"
                                onClick={() => handleSelectSong(song.id)}>
                                    <img src="(hover)playButton.svg" alt="Play Button"/>
                                </button>
                            </div>
                            <div>
                                <h2>{song.name}</h2>
                                <p>{song.type} &#x2022; {getArtistName(song.artist_id)}</p>
                            </div>
                       </>) : 
                       (<>
                            <img src={song.img_url} alt={song.name} width={48} height={48} className="rounded"/>
                            <div>
                                <h2>{song.name}</h2>
                                <p>{song.type} &#x2022; {getArtistName(song.artist_id)}</p>
                            </div>
                       </>)}
                    </li>
                ))}
            </ul>
        </div>
    )
}