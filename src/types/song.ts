export interface Song {
  id: number;
  name: string;
  album_id?: number;
  artist_id?: number; 
  duration: number;
  mp3_url: string;
  img_url?: string; 
  track_number?: number; 
  plays: number;
  type: string;
  genre: string;
  release_date: string; 
}
