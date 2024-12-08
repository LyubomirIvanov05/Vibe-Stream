'use client'
import { useState, useEffect, useRef } from "react";
import { Song } from "@/types/song";
import { Artist } from "@/types/artist";
import { Album } from "@/types/album";
import { useSongContext } from "./AlbumContext";



export default function PlayBar() {
    const { song } = useSongContext();  
    const [songs, setSongs] = useState<Song[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null); 


    useEffect(() => {
        async function fetchSongs() {
          try {
            const response = await fetch('/api/songs');
            const data = await response.json();

            setSongs(data.songs);
            setArtists(data.artists);
            setAlbums(data.albums);
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

    const getAlbum = (album_id: number): Album | null => {
        const playingSongAlbum = albums.find((album) => album.id === album_id);
        return playingSongAlbum || null;
    }

    useEffect(() => {
        if (song.id !== null) {
            const currSong = getSong(song.id);
            if (currSong && audioRef.current) {
                audioRef.current.src = currSong.mp3_url;
                audioRef.current.play();
            }
        }
    }, [song.id]);

    const selectedSong = song.id !== null ? getSong(song.id) : null;
    const selectedSongArtist = selectedSong && selectedSong.artist_id !== undefined ? getArtist(selectedSong.artist_id) : null;
    const selectedSongAlbum = selectedSong && selectedSong.album_id !== undefined ? getAlbum(selectedSong.album_id) : null;
    return(
         <div className="px-3 py-2 flex">
                {selectedSong ? (
                       <div className="flex flex-row items-center">
                            <div className="flex flex-row gap-4 justify-items-start items-center">
                                <img src={selectedSongAlbum? selectedSongAlbum.cover_image_url : "Soong Cover"} alt="Song Cover" width={56} height={56}/>
                                <div>
                                    <p className="text-sm">{selectedSong.name}</p>
                                    <p className="text-xs">{selectedSongArtist? selectedSongArtist.name : "Unknown Artist"}</p>
                                </div>
                            </div>
                            <div>
                                <audio ref={audioRef} controls>
                                    <source src={selectedSong.mp3_url} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                       </div>
                    ) : selectedSong === null ? (
                    <p>Select a song to play</p>
                ) : (
                    <p>Song not found</p>
                )}
        </div>
    )
}