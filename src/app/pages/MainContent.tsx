'use client'
import songs from "../../songs.json";
import { useState } from "react";

export default function MainContent() {
    const [filteredSongs, setFilteredSongs] = useState(songs);
    const [hoveredSong, setHoveredSong] = useState(-1);

    const [activeFilter, setActiveFilter] = useState("Everyone");

    const showAll = () => {
        setFilteredSongs(songs);

        setActiveFilter("Everyone")
    }

    const showAlbums = () => {
        const albums =songs.filter((song) => song.type === "Album");
        setFilteredSongs(albums);
        setActiveFilter("Albums")
    }

    const showSongs = () => {
        const singles = songs.filter((song) => song.type === "Song")
        setFilteredSongs(singles);
        setActiveFilter("Singles");
    }



    return(
        <div className="bg-component_bg w-custom-640 p-4 h-full rounded-md">
            <ul className="flex flex-row gap-2 mb-4">
                <button className={`border rounded-3xl py-1 px-4 text-sm ${
                    activeFilter === "Everyone" ? "bg-white text-black" : "text-white"}`}
                onClick={showAll}>Everyone</button>

                <button className={`border rounded-3xl py-1 px-4 text-sm ${
                    activeFilter === "Singles" ? "bg-white text-black" : "text-white"}`}
                onClick={showSongs}>Music</button>

                <button className={`border rounded-3xl py-1 px-4 text-sm ${
                    activeFilter === "Albums" ? "bg-white text-black" : "text-white"}`}
                onClick={showAlbums}>Albums</button>
                <button className="border rounded-3xl px-3 py-1 text-white">Audiobooks</button>
            </ul>
            <div className="grid grid-cols-2 grid-rows-4 gap-2">
                {filteredSongs.slice(0, 8).map((song) => (
                    <li key={song.id} className={`list-none flex flex-row gap-2 items-center relative rounded-md overflow-hidden ${
                        hoveredSong === song.id ? "bg-red-950" : "bg-song_bg"}`} 
                        onMouseEnter={() => setHoveredSong(song.id)} onMouseLeave={() => setHoveredSong(-1)}>
                        {hoveredSong === song.id ? (
                            <>
                                <img src={song.image} alt={song.name} width={48} height={48}/>
                                <h2>{song.name}</h2>
                                <img src="playButton.svg" alt="Play button" className="w-8 absolute right-2 hover:scale-110"/>
                            </>
                        ): (
                            <>
                                <img src={song.image} alt={song.name} width={48} height={48}/>
                                <h2 className="text-white">{song.name}</h2>
                            </>
                        )}
                                
                    </li>
                ))}      
            </div>
        </div>
    );
}