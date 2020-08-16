import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  apiKey : string = 'AIzaSyAqTUiBWFpUKeBJPg5VXULW12eHIgETeHY';
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response' as 'response',
  };


  constructor(
    private http: HttpClient
  ) { }

  getVideos(searchTerm): Observable<any> {
    const params = {
      key: this.apiKey,
      order: 'date',
      part: 'snippet',
      type: 'video',
      maxResults: 10,
      q: searchTerm
    };
    this.httpOptions.params = params
    let url = 'https://www.googleapis.com/youtube/v3/search';
    return this.http.get(url, this.httpOptions)
      .pipe(map((res) => {
        return res;
      }))
  }
}
