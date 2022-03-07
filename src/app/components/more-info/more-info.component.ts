import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ImdbDetails, ImdbModel } from 'src/app/models/imdb';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
})
export class MoreInfoComponent implements OnInit, OnDestroy {
  extract: string = '';
  wikiId: string = '';
  imdb: ImdbModel = {} as ImdbModel;
  loaded: boolean = false;
  imdbLoaded: boolean = false;

  private wikiSubsrciption: Subscription = new Subscription();
  private imdbSubscription: Subscription = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { movieName: string; year: string },
    public linkService: LinkService
  ) {}

  ngOnDestroy(): void {
    this.wikiSubsrciption.unsubscribe();
    this.imdbSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getExtract();
    this.getIMDBLink();
  }

  getExtract() {
    this.wikiSubsrciption = this.linkService
      .getExtract(this.data.movieName)
      .subscribe(
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
    this.imdbSubscription = this.linkService
      .getImdbID(this.data.movieName, this.data.year)
      .subscribe(
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
