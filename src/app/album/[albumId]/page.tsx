'use client'
import { useAlbumContext } from "@/app/pages/AlbumContext";
import { Album } from "@/types/album";
import { Artist } from "@/types/artist";
import { Song } from "@/types/song";
import {useEffect, useState } from "react";

export default function AlbumContentPage({ params }: { params: { id: string } }){
    const albumId = parseInt(params.id, 10);
    const {album} = useAlbumContext();
    const [songs, setSongs] = useState<Song[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);

        
    useEffect(() => {
        async function fetchContent() {
          try {
            const response = await fetch('/api/songs');
            const data = await response.json();

            setSongs(data.songs);
            setArtists(data.artists);
          } catch (error) {
            console.error('Error fetching songs:', error);
          }
        }
    
        fetchContent();
      }, []);

      const artist = artists.find((artist) => artist.id === album.artist_id);
      const albumSongsCount = songs.filter((song) => song.album_id === album.id).length;
      const minutes = (album.total_duration || 0) / 60;
      const seconds = (album.total_duration || 0) % 60;

      console.log("Album id:   " + album.id)  
    return(
          <div className="bg-component_bg w-custom-640 p-4 h-full rounded-md overflow-auto">
              <div className="flex flex-row gap-4 items-end mb-6">
                  <img 
                      src={album.cover_image_url} 
                      alt={album.name} 
                      width={145} 
                      height={145} 
                      className="shadow-2xl"
                  />
      
                  <div className="items-end h-full text-white">
                      <p className="text-xs opacity-80">Album</p>
                      <h1 className="text-3xl font-bold">{album.name}</h1>
                      <p className="text-sm opacity-90">
                          {artist?.name} &#x2022; {album.release_date} &#x2022; {albumSongsCount} songs, {Math.floor(minutes)} min {seconds} sec
                      </p>
                  </div>
              </div>
              <div className="flex flex-row gap-4 mb-6">
                  <img src="/play-button.svg" alt="Play Button" width={50} height={50}/>
                  <img src="/add-button.svg" alt="Add Button" width={35} height={35}/>
                  <img src="/moreButton.svg" alt="More Button" width={35} height={35}/>
              </div>
              <div>
                  <div className="flex flex-row justify-between px-6 text-white">
                      <div className="flex flex-row gap-3">
                          <p>#</p>
                          <p>Title</p>
                      </div>
                      <img src="/clock.svg" alt="Clock image" width={15} height={15}/>
                  </div>
                  <div className="w-full h-px bg-white border-none opacity-30 mb-3"></div>
                  <div className="px-2 text-white">
                      {songs.filter((song) => song.album_id === album.id).map((song) => (
                          <li 
                              className="list-none flex flex-row gap-4 relative py-2 hover:bg-side_hovered_song" 
                              key={song.id}
                          >
                              <span className="text-right w-6 opacity-70 py-2">{song.track_number}</span>
                              <div>
                                  <h2 className="hover:underline cursor-pointer">{song.name}</h2>
                                  <p className="text-sm hover:underline cursor-pointer w-fit opacity-70">{artist?.name}</p>
                              </div>
                              <p className="absolute top-1/4 right-6 w-6 opacity-70">
                                  {Math.floor(song.duration / 60)}:{song.duration % 60 < 10 ? `0${song.duration % 60}` : song.duration % 60}
                              </p>
                          </li>
                      ))}
                  </div>
              </div>
          </div>
    )
}