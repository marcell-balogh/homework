export interface Movie {
  id: Number;
  name: String;
  tagline: String;
  overview: String;
  genres: Genre[];
  releaseDate: Date;
  runtime: Number;
  budget: Number;
  revenue: String;
  adult: Boolean;
  homepage: URL;
  popularity: Number;
  score: number;
  votes: Number;
  similar: Movie[];
}

export interface Genre {
  id: Number;
  name: string;
}
