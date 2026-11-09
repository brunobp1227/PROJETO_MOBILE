export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  year: number;
  duration: number; // em minutos
  rating: number; // nota de 0 a 5 ou 0 a 10
  director: string;
  genre: string[];
  description: string;
  posterUrl: string;
  bannerUrl?: string;
  trailerUrl?: string;
  isFavorite: boolean;
  status: 'watched' | 'want_to_watch' | 'watching';
  createdAt?: string;
}

export type MovieFilter = {
  genre?: string;
  status?: string;
  minRating?: number;
  yearMin?: number;
  yearMax?: number;
  onlyFavorites?: boolean;
};

export type MovieSortOption = 
  | 'title_asc'
  | 'title_desc'
  | 'newest'
  | 'oldest'
  | 'rating_desc'
  | 'rating_asc';