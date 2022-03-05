import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
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

  searchMoviesQuery(query: String) {
    return this.apollo.watchQuery<any>({
      query: this.SEARCH_MOVIES,
      variables: {
        query: query,
      },
      errorPolicy: 'all',
    });
  }
}
