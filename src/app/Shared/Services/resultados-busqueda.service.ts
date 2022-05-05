import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { SearchMoviesApiResponse, SearchSeriesApiResponse } from '../Models/SearchAPIs';


@Injectable({
  providedIn: 'root'
})
export class ResultadosBusquedaService {
  private searchMoviesSource = new BehaviorSubject<SearchMoviesApiResponse>({} as SearchMoviesApiResponse);
  private searchSeriesSource = new BehaviorSubject<SearchSeriesApiResponse>({} as SearchSeriesApiResponse);

  searchMovies = this.searchMoviesSource.asObservable();
  searchSeries = this.searchSeriesSource.asObservable();

  constructor() { }  

  sendMoviesResults(message: SearchMoviesApiResponse) { 
    this.searchMoviesSource.next(message);
  }
  sendSeriesResults(message: SearchSeriesApiResponse) {
    this.searchSeriesSource.next(message);  
  }  
}
