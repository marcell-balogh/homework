import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImdbDetails, ImdbModel } from 'src/app/models/imdb';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
})
export class MoreInfoComponent implements OnInit {
  extract: string = '';
  wikiId: string = '';
  imdb: ImdbModel = {} as ImdbModel;
  loaded: boolean = false;
  imdbLoaded: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { movieName: string; year: string },
    public linkService: LinkService
  ) {}

  ngOnInit(): void {
    this.getExtract();
    this.getIMDBLink();
  }

  getExtract() {
    this.linkService.getExtract(this.data.movieName).subscribe(
      (data) => {
        this.wikiId = Object.keys(data.query.pages)[0];
        this.extract = data.query.pages[this.wikiId].extract;
      },
      (error) => {},
      () => {
        this.loaded = true;
      }
    );
  }

  getIMDBLink() {
    this.linkService.getImdbID(this.data.movieName, this.data.year).subscribe(
      (data) => {
        this.imdb = data.results[0];
      },
      (error) => {},
      () => {
        this.imdbLoaded = true;
      }
    );
  }
}
