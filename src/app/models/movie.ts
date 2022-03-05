export interface Movie {
  id: Number;
  name: String;
  tagline: String;
  overview: String;
  releaseDate: Date;
  runtime: Number;
  budget: Number;
  revenue: String;
  adult: Boolean;
  homepage: URL;
  popularity: Number;
  score: Number;
  votes: Number;
  similar: Movie[];
}
