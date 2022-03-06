export interface Movie {
  id: number;
  name: string;
  tagline: string;
  overview: string;
  genres: Genre[];
  releaseDate: Date;
  runtime: number;
  socialMedia: SocialMedia;
  budget: number;
  revenue: string;
  adult: Boolean;
  homepage: URL;
  popularity: number;
  score: number;
  votes: number;
  similar: Movie[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface SocialMedia {
  id: string;
  imdb: string;
  facebook: string;
  instagram: string;
  twitter: string;
}
