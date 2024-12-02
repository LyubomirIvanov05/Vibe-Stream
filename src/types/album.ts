export interface Album {
    id: number;
    name: string;
    release_date: string; 
    genre: string;
    cover_image_url: string; 
    total_duration: number;
    artist_id?: number; 
}
