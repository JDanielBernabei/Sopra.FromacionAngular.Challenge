import { Injectable } from '@angular/core';
import { BehaviorSubject, AsyncSubject, ReplaySubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResultadosBusquedaService {
  private searchMoviesSource = new BehaviorSubject<any>([]);
  private searchSeriesSource = new BehaviorSubject<any[]>([]);

  searchMovies = this.searchMoviesSource.asObservable();
  searchSeries = this.searchSeriesSource.asObservable();

  constructor() { }  

  sendMoviesResults(message: any) { 
    this.searchMoviesSource.next(message);
  }
  sendSeriesResults(message: any[]) {
    this.searchSeriesSource.next(message);  
  }  
}
