import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private apollo: Apollo) {}

  SEARCH_MOVIES = gql`
    query SearchMovies($query: String!) {
      searchMovies(query: $query) {
        id
        name
        overview
        releaseDate
        genres {
          name
        }
        score
      }
    }
  `;
  GET_MOVIE = gql`
    query getMovie {
      movie(id: $id) {
        id
        name
        overview
        releaseDate
        genres {
          name
        }
        score
        similar {
          id
          name
          overview
          releaseDate
          genres {
            name
          }
          score
        }
      }
    }
  `;

  searchMoviesQuery(query: String) {
    return this.apollo.watchQuery<any>({
      query: this.SEARCH_MOVIES,
      variables: {
        query: query,
      },
      errorPolicy: 'all',
    });
  }

  getMovieQuery(id: String) {
    return this.apollo.watchQuery<any>({
      query: this.GET_MOVIE,
      variables: {
        id: id,
      },
      errorPolicy: 'all',
    });
  }
}
