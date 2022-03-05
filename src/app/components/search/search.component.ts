import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  public loading: boolean = false;
  public error: any;
  query: String = '';

  constructor(private searchService: SearchService) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {}

  searchMovies() {
    this.searchService
      .searchMoviesQuery(this.query)
      .valueChanges.subscribe(({ data, loading, error }) => {
        this.loading = loading;
        if (data) {
          this.movies = data.searchMovies;
        }
        this.error = error;
      });
  }
}
