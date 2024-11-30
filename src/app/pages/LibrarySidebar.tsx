'use client'
import { useState } from "react";
import songs from "../../songs.json"

export default function LibrarySidebar() {
    const [filteredSongs, setFilteredSongs] = useState(songs);
    const [isFiltered, setIsFiltered] = useState(false);


    const showAlbums = () => {
        const albums =songs.filter((song) => song.type === "Album");
        setFilteredSongs(albums);
        setIsFiltered(true);
    }

    const showAll = () => {
        setFilteredSongs(songs);
        setIsFiltered(false);
    }

    //px-16 py-12

    return(
        <div className="bg-component_bg px-4 py-3 flex flex-col gap-4 h-screen">
            <div className="flex flex-row gap-4">
                <img src="library.svg" alt="" className="w-6"/>
                <h1>Your library</h1>
            </div>
            {isFiltered ? (
                <div className="flex flex-row gap-4">
                    <button onClick={showAll} className="bg-button_bg rounded-full flex items-center justify-center w-7 h-7">
                        <img src="close.svg" alt="Close button" className="w-5 h-5" />
                    </button>
                    <button className="bg-white rounded-3xl py-1 px-4 text-sm text-black" onClick={showAlbums}>Playlists</button>
                </div>) : 
                (<div className="flex flex-row gap-4">
                    <button className="bg-button_bg rounded-3xl py-1 px-4 text-sm" onClick={showAlbums}>Playlists</button>
                </div>
                )}
            
            
            <ul className="flex flex-col gap-4">
                {filteredSongs.map((song) =>(
                    <li key={song.id} className="flex flex-row gap-4">
                        <img src={song.image} alt={song.name} width={48} height={48} />
                        <div>
                            <h2>{song.name}</h2>
                            <p>{song.type} &#x2022; {song.artist}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}