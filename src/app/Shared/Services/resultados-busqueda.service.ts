import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { SearchMoviesList, SearchSeriesList } from '../Models/SearchAPIs';


@Injectable({
  providedIn: 'root'
})
export class ResultadosBusquedaService {
  private searchMoviesSource = new BehaviorSubject<SearchMoviesList[]>([]);
  private searchSeriesSource = new BehaviorSubject<SearchSeriesList[]>([]);

  searchMovies = this.searchMoviesSource.asObservable();
  searchSeries = this.searchSeriesSource.asObservable();

  constructor() { }  

  sendMoviesResults(message: SearchMoviesList[]) { 
    this.searchMoviesSource.next(message);
  }
  sendSeriesResults(message: SearchSeriesList[]) {
    this.searchSeriesSource.next(message);  
  }  
}
