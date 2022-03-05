export interface Movie {
  id: number;
  name: string;
  tagline: string;
  overview: string;
  genres: Genre[];
  releaseDate: Date;
  runtime: number;
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
