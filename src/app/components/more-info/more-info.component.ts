import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMDBModel } from 'src/app/models/imdb';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
})
export class MoreInfoComponent implements OnInit {
  extract: string = '';
  wikiId: string = '';
  imdb: IMDBModel = {} as IMDBModel;
  loaded: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { movieName: string },
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
    this.linkService.getIMDBLink(this.data.movieName).subscribe((data) => {
      this.imdb= data;
    });
  }
}
