import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private apollo: Apollo) {}

  searchMovies(query: String): Movie[] {
    let movies: Movie[] = [];
    this.apollo
      .watchQuery<Movie[]>({
        query: gql` 
      {
        searchMovies(query: "${query}") {
          id
          name
          overview
          releaseDate
          cast {
            id
            person {
              name
            }
            role {
              ... on Cast {
                character
              }
            }
          }
        }
      }`,
      })
      .valueChanges.subscribe((result: any) => {
        movies = result;
      });
    return movies;
  }
}
