import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResultadosBusquedaService {
  private searchResultsSource = new Subject<any>();

  searchResults = this.searchResultsSource.asObservable();

  constructor() { }

  sendSearchResults(message: any) {
    this.searchResultsSource.next(message);  
  }
}
