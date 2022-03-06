import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMDBModel } from '../models/imdb';
import { WikiResult } from '../models/wikipedia';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor(private http: HttpClient) {}

  getExtract(title: string): Observable<WikiResult> {
    return this.http.get<WikiResult>(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=&explaintext=&titles=${title}`
    );
  }

  //http://www.omdbapi.com/?apikey=ec3b6a3d&t=fight+club
  //http://www.omdbapi.com/
  API_KEY = 'ec3b6a3d';

  getIMDBLink(movieName: string): Observable<IMDBModel> {
    return this.http.get<IMDBModel>(
      `http://www.omdbapi.com/?apikey=${this.API_KEY}&t=${movieName}`
    );
  }
}
