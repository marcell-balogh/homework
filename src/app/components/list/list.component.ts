import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { MoreInfoComponent } from '../more-info/more-info.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  query: string = '';
  movieId: string = '';
  movies: Movie[] = [];
  loading: boolean = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params.query;
      this.movieId = params.movieId;
      if (this.query !== undefined) {
        this.searchMovies();
      }
      else if (this.movieId !== undefined) {
        this.getSimilarMovies();
      }
    });
  }
  getSimilarMovies() {
    this.movieService
      .getMovieQuery(this.movieId)
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        if (data) {
          this.movies = data.movie.similar;
        }
      });
  }

  searchMovies() {
    this.movieService
      .searchMoviesQuery(this.query)
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        if (data) {
          this.movies = data.searchMovies;
        }
      });
  }

  openMoreInfo(movieName: string) {
    this.dialog.open(MoreInfoComponent, {
      data: {
        movieName: movieName,
      },
    });
  }
}
