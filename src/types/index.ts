export interface Artist {
  id: number;
  name: string;
  bio: string;
  photoUrl: string;
}

export interface Song {
  id: number;
  title: string;
  artistId: number;
  releaseYear: number;
  duration: number;
  coverUrl: string;
  artist?: Artist;
}