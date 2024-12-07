'use client'
import MainContent from "./album/MainContent";
import { useAlbumContext } from "./pages/AlbumContext";
 
export default function Home() {
  const { album, setAlbum} = useAlbumContext();

  return (<MainContent/>
  );
}
