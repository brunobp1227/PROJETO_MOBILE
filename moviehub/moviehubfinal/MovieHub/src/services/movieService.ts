import { api } from './api';

export type MoviePayload = {
  title: string; description?: string; year: number; director?: string; duration?: number;
  rating?: number | null; status: 'watched' | 'want_to_watch' | 'watching'; favorite?: boolean;
  genre_id?: number | null; image_url?: string | null; trailer_url?: string | null;
};
export type ApiMovie = MoviePayload & { id: string; user_id: string; created_at: string; genres?: { id: number; name: string } | null };

export const getMovies = (query = '') => api<ApiMovie[]>(`/movies${query ? `?${query}` : ''}`);
export const getMovie = (id: string) => api<ApiMovie>(`/movies/${id}`);
export const createMovie = (movie: MoviePayload) => api<ApiMovie>('/movies', { method: 'POST', body: JSON.stringify(movie) });
export const updateMovie = (id: string, movie: Partial<MoviePayload>) => api<ApiMovie>(`/movies/${id}`, { method: 'PUT', body: JSON.stringify(movie) });
export const deleteMovie = (id: string) => api<void>(`/movies/${id}`, { method: 'DELETE' });
export const getGenres = () => api<{ id: number; name: string }[]>('/genres');
