'use client'
import { Album } from "@/types/album";
import { Artist } from "@/types/artist";
import { Song } from "@/types/song";
import { useState, useEffect } from "react";
import { useSongContext } from "./AlbumContext";

export default function SongContent() {
    const { song } = useSongContext();
    const [songs, setSongs] = useState<Song[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);

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

    const albumsFromArtist = (artist_id: number): Album[] => {
        return albums.filter((album) => album.artist_id === artist_id);
    }

      const selectedSong = song.id !== null ? getSong(song.id) : null;
      const selectedSongArtist = selectedSong && selectedSong.artist_id !== undefined ? getArtist(selectedSong.artist_id) : null;
      const selectedSongAlbum = selectedSong && selectedSong.album_id !== undefined ? getAlbum(selectedSong.album_id) : null;
      const artistAlbums = selectedSongArtist ? albumsFromArtist(selectedSongArtist.id) : [];


    return(
        <div className="bg-component_bg px-4 py-5 flex flex-col gap-4 h-full w-custom-420 rounded-md overflow-auto">
            {selectedSong ? (
                <div>
                    <div className="flex flex-row justify-between mb-4">
                        <a className="font-bold hover:underline" href="">{selectedSongAlbum?.name}</a>
                        <div className="flex gap-4">
                            <button>
                            <img className="w-5 h-5" src="/moreButton.svg" alt="More button"/>
                            </button>
                            <button>
                                <img className="w-5 h-5" src="/close.svg" alt="More button" />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <img className="rounded-xl mb-4" src={selectedSongAlbum?.cover_image_url} alt="Album Cover" width={388} height={388}/>
                        <p className="hover:underline text-3xl font-bold">{selectedSong.name}</p>
                        <p className="hover:underline">{selectedSongArtist?.name}</p>
                    </div>
                    <div>
                        <p>More from {selectedSongArtist?.name}</p>
                        <div className="flex flex-col gap-2">
                            {artistAlbums.length > 0 ? (
                                artistAlbums.slice(0, 3).map((album) => (
                                    <div key={album.id} className="flex flex-row gap-4 rounded-xl bg-side_hovered_song p-3">
                                        <img className="rounded" src={album.cover_image_url} alt={album.name} width={48} height={48}/>
                                        <div>
                                            <p>{album.name}</p>
                                            <p>{selectedSongArtist?.name}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>dawdbawjdkb</div>
                            )}
                        </div>
                    </div>
                </div>
            ): (<div></div>)}
        </div>
    )
}