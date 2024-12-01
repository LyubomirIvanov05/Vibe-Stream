'use client'
import { useState, useEffect, useRef } from "react";
import { Song } from "@/types/song";
import { Artist } from "@/types/artist";

export default function PlayBar({ selectedSongId }: { selectedSongId: number | null }) {
    const [songs, setSongs] = useState<Song[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null); 

    useEffect(() => {
        async function fetchSongs() {
          try {
            const response = await fetch('/api/songs');
            const data = await response.json();

            setSongs(data.songs);
            setArtists(data.artists);
          } catch (error) {
            console.error('Error fetching songs:', error);
          }
        }
    
        fetchSongs();
      }, []);



    const getSong = (song_id: number): Song | null => {
        const playingSong = songs.find((song) => song.id === song_id);
        return playingSong || null;
    };

    const getArtist = (artist_id: number): Artist | null => {
        const playingSongArtist = artists.find((artist) => artist.id === artist_id);
        return playingSongArtist || null;
    }


    useEffect(() => {
        if (selectedSongId !== null) {
            const song = getSong(selectedSongId);
            if (song && audioRef.current) {
                audioRef.current.src = song.mp3_url;
                audioRef.current.play();
            }
        }
    }, [selectedSongId]);

    const selectedSong = selectedSongId !== null ? getSong(selectedSongId) : null;
    const selectedSongArtist = selectedSong && selectedSong.artist_id !== undefined ? getArtist(selectedSong.artist_id) : null;
    return(
         <div className="px-3 py-2">
                {selectedSong ? (
                       <div className="flex flex-row justify-around">
                        <div className="flex flex-row gap-4 justify-items-start items-center">
                            <img src={selectedSong.img_url} alt="Song Cover" width={56} height={56}/>
                            <div>
                                <p className="text-sm">{selectedSong.name}</p>
                                <p className="text-xs">{selectedSongArtist? selectedSongArtist.name : "Unknown Artist"}</p>
                            </div>
                        </div>
                         <audio ref={audioRef} controls>
                            <source src={selectedSong.album} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                       </div>
                    ) : selectedSong === null ? (
                    <p>Select a song to play</p>
                ) : (
                    <p>Song not found</p>
                )}
        </div>
    )
}