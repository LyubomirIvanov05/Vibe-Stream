'use client'
import { Album } from "@/types/album";
import { Artist } from "@/types/artist";
import { Song } from "@/types/song";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function AlbumContentPage({ albumId, setCurrentAlbumId }
    : {albumId: number; setCurrentAlbumId: Dispatch<SetStateAction<number | null>>}){
    const [songs, setSongs] = useState<Song[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
        
    useEffect(() => {
        async function fetchContent() {
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
    
        fetchContent();
      }, []);

      const album = albums.find((album) => album.id === albumId);
      const artist = artists.find((artist) => artist.id === album?.artist_id);
      const albumSongsCount = songs.filter((song) => song.album_id === album?.id).length;
      const minutes = (album?.total_duration || 0) / 60;
      const seconds = (album?.total_duration || 0) % 60;
    return(
        <div className="bg-component_bg w-custom-640 p-4 h-full rounded-md">
            <div className="flex flex-row gap-4 items-end">
                <img src={album?.cover_image_url} alt={album?.name} width={145} height={145}/>
                <div className="items-end h-full">
                    <p className="text-xs">Album</p>
                    <h1 className="text-3xl font-bold">{album?.name}</h1>
                    <p className="text-sm">{artist?.name} &#x2022; {album?.release_date} &#x2022; {albumSongsCount} songs, {Math.floor(minutes)} min {seconds} sec</p>
                </div>
            </div>
        </div>
    )
}