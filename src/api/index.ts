import axios from 'axios';
import { Artist, Song } from '../types';

const API_URL = 'http://localhost:3000';

export const api = {
  // Artists
  getArtists: () => axios.get<Artist[]>(`${API_URL}/artists`),
  getArtist: (id: number) => axios.get<Artist>(`${API_URL}/artists/${id}`),
  createArtist: (artist: Omit<Artist, 'id'>) => axios.post<Artist>(`${API_URL}/artists`, artist),
  updateArtist: (id: number, artist: Partial<Artist>) => axios.put<Artist>(`${API_URL}/artists/${id}`, artist),
  deleteArtist: (id: number) => axios.delete(`${API_URL}/artists/${id}`),

  // Songs
  getSongs: () => axios.get<Song[]>(`${API_URL}/songs`),
  getSong: (id: number) => axios.get<Song>(`${API_URL}/songs/${id}`),
  getArtistSongs: (artistId: number) => axios.get<Song[]>(`${API_URL}/songs/artist/${artistId}`),
  createSong: (song: Omit<Song, 'id'>) => axios.post<Song>(`${API_URL}/songs`, song),
  updateSong: (id: number, song: Partial<Song>) => axios.put<Song>(`${API_URL}/songs/${id}`, song),
  deleteSong: (id: number) => axios.delete(`${API_URL}/songs/${id}`)
};