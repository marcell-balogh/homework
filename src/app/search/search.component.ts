import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  public loading: boolean = false;
  public error: any;
  public movieQuery: QueryRef<any> | undefined;
  query: String = 'Fight Club';

  constructor(private apollo: Apollo) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {}

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

  searchMovies() {
    this.movieQuery = this.apollo.watchQuery<any>({
      query: this.SEARCH_MOVIES,
      variables: {
        query: this.query,
      },
      errorPolicy: 'all',
    });
    this.movieQuery.valueChanges.subscribe(({ data, loading, error }) => {
      this.loading = loading;
      if (data) {
        this.movies = data.searchMovies;
      }
      this.error = error;
    });
  }
}
