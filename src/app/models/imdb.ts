export interface ImdbModel {
  id: string;
  resultType: string;
  image: string;
  title: string;
  description: string;
}

export interface ImdbResults {
  searchType: string;
  expression: string;
  results: ImdbModel[];
  errorMessage: string;
}

export interface ImdbDetails {
  imDbId: string;
  title: string;
  fullTitle: string;
  type: string;
  year: string;
  imDb: string;
  metacritic: string;
  theMovieDb: string;
  rottenTomatoes: string;
  tV_com: string;
  filmAffinity: string;
  errorMessage: string;
}
