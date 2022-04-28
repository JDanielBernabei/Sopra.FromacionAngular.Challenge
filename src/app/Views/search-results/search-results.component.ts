import { compileClassMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {ResultadosBusquedaService} from 'src/app/Shared/Services/resultados-busqueda.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  pageTitle = "Resultados Búsqueda";

  queriedMovies: any[] = [];
  queriedShows: any[] = [];
  resultadosBusqueda: any[] = [];

  constructor(private resultadosBusquedaService: ResultadosBusquedaService){};

  ngOnInit(): void {
    this.searchResults();
  };

  private  searchResults():void{
    this.resultadosBusquedaService.searchMovies.subscribe(
      (data: any) => {
        this.queriedMovies = data;       
        
        this.resultadosBusquedaService.searchSeries.subscribe(
          (data: any) => {
            this.queriedShows = data;  

            let tempArray: any[] = [];
            for (var i=0, j=0, k=0; i < this.queriedMovies.length || j < this.queriedShows.length;) {
              if (i < this.queriedMovies.length) {
                tempArray.push(this.queriedMovies[i++]);
              }
              if (j < this.queriedShows.length) {
                tempArray.push(this.queriedShows[j++]);
              }
            }
            this.resultadosBusqueda = tempArray;
        });
    });    
  }
}
