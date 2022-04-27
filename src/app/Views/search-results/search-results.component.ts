import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  
  queriedMovies: any[] = [];
  queriedShows: any[] = [];
  resultadosBusqueda: any[] = [];

  constructor(){};
  ngOnInit(): void {};

  show(){
    if (this.queriedMovies.length > this.queriedShows.length){
      for (let i=0; i<this.queriedShows.length; i+=2){
        this.resultadosBusqueda[i] = this.queriedMovies[i];
        this.resultadosBusqueda[i+1] = this.queriedShows[i];
      }
      for (let i=this.queriedShows.length; i<this.queriedMovies.length; i++){
        this.resultadosBusqueda[i] = this.queriedMovies[i];
      }
    } else{
      for (let i=0; i<this.queriedMovies.length; i+=2){
        this.resultadosBusqueda[i] = this.queriedMovies[i];
        this.resultadosBusqueda[i+1] = this.queriedShows[i];
      }
      for (let i=this.queriedMovies.length; i<this.queriedShows.length; i++){
        this.resultadosBusqueda[i] = this.queriedShows[i];
      }
    }
  }

}
