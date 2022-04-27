import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResultadosBusquedaService {
  private searchMoviesSource = new Subject<any>();
  private searchSeriesSource = new Subject<any>();

  searchMovies = this.searchMoviesSource.asObservable();
  searchSeries = this.searchSeriesSource.asObservable();

  constructor() { }

  sendMoviesResults(message: any) {
    this.searchMoviesSource.next(message);  
  }

  sendSeriesResults(message: any) {
    this.searchSeriesSource.next(message);  
  }
}
