import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { SearchService } from 'src/app/services/search.service';
import { MoreInfoComponent } from '../more-info/more-info.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  query: string = '';
  movies: Movie[] = [];
  loading: boolean = false;
  error: any;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params.query;
      console.log(this.query);
      this.searchMovies();
    });
  }

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

  openMoreInfo(movieName: string) {
    this.dialog.open(MoreInfoComponent, {
      data: {
        movieName: movieName,
      },
    });
  }
}
