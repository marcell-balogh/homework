import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { MoreInfoComponent } from '../more-info/more-info.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  query: string = '';
  movieId: string = '';
  movie: Movie = {} as Movie;
  movies: Movie[] = [];
  loading: boolean = false;

  private similarSubscription: Subscription = new Subscription();
  private searchSubscription: Subscription = new Subscription();

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private location: Location,
    private titleService: Title
  ) {}

  ngOnDestroy(): void {
    this.similarSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params.query;
      this.movieId = params.movieId;
      if (this.query) {
        this.searchMovies();
        this.titleService.setTitle(`Search results for ${this.query}`);
      } else if (this.movieId !== undefined) {
        this.getSimilarMovies();
        this.titleService.setTitle(`Similar movies for ${this.movieId}`);
      }
    });
  }

  back() {
    this.location.back();
  }

  getSimilarMovies() {
    this.similarSubscription = this.movieService
      .getMovieQuery(this.movieId)
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        if (data) {
          this.movie = data.movie;
          this.movies = data.movie.similar;
        }
      });
  }

  searchMovies() {
    this.searchSubscription = this.movieService
      .searchMoviesQuery(this.query)
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        if (data) {
          this.movies = data.searchMovies;
        }
      });
  }

  openMoreInfo(movieName: string, year: string) {
    console.log(movieName, year);
    const date = new Date(year);
    this.dialog.open(MoreInfoComponent, {
      data: {
        movieName: movieName,
        year: date.getFullYear().toString(),
      },
    });
  }
}
