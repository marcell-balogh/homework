import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImdbDetails, ImdbResults } from '../models/imdb';
import { WikiResult } from '../models/wikipedia';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor(private http: HttpClient) {}

  getExtract(title: string): Observable<WikiResult> {
    return this.http.get<WikiResult>(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro=&explaintext=&titles=${title}`
    );
  }

  //https://imdb-api.com/
  API_KEY = 'k_51h50o51';

  getImdbID(movieName: string, year: string): Observable<ImdbResults> {
    return this.http.get<ImdbResults>(
      `https://imdb-api.com/en/API/SearchMovie/${this.API_KEY}/${movieName}%20${year}`
    );
  }
}
