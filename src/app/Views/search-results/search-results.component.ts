import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { DiscoverMoviesApiResponse, DiscoverMoviesList, DiscoverSeriesApiResponse, DiscoverSeriesList } from 'src/app/Shared/Models/DiscoverAPIs';
import { SearchMoviesList, SearchSeriesList } from 'src/app/Shared/Models/SearchAPIs';
import { ClientHttpService } from 'src/app/Shared/Services/client-http.service';
import {ResultadosBusquedaService} from 'src/app/Shared/Services/resultados-busqueda.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  pageTitle = "";

  queriedMovies: (DiscoverMoviesList | SearchMoviesList)[] = [];      // 
  queriedShows: (DiscoverSeriesList | SearchSeriesList)[] = [];       // CAMBIAR DE LISTA A APIRESPONSE PARA HACER LA PAGINACION
  resultadosBusqueda: (SearchMoviesList | SearchSeriesList)[] = [];   // 

  constructor(private resultadosBusquedaService: ResultadosBusquedaService, private router: Router, private clientHttpService: ClientHttpService){};

  ngOnInit(): void {
    if (this.router.url.includes("/movies")){
      this.pageTitle = "Movies";      
      this.retrievePopularMovies();
    } else if (this.router.url.includes("/series")){
      this.pageTitle = "Series";
      this.retrievePopularSeries();
    } else if (this.router.url.includes("/search/")){
      this.pageTitle = "Resultados Búsqueda";
      this.searchResults();
    } else {
      this.pageTitle = "Descubre";
      this.retrievePopular();      
    }    
  };

  private retrievePopularMovies():void{
    this.clientHttpService.getPopularMovies().subscribe({
      next: (data : DiscoverMoviesApiResponse) => { 
        this.resultadosBusqueda = data.results;
      },
      error: () => {console.log("failure");}
    });    
  }

  private retrievePopularSeries(): void{
    this.clientHttpService.getPopularSeries().subscribe({
      next: (data : DiscoverSeriesApiResponse) => { 
        this.resultadosBusqueda = data.results;
      },
      error: () => {console.log("failure");}
    });
  }

  private  retrievePopular():void{
    this.clientHttpService.getPopularMovies().subscribe({
      next: (data: DiscoverMoviesApiResponse) => {        
        this.queriedMovies = data.results;       
        
        this.clientHttpService.getPopularSeries().subscribe({
          next: (data: DiscoverSeriesApiResponse) => {
            this.queriedShows = data.results;  

            let tempArray = [];
            for (var i=0, j=0, k=0; i < this.queriedMovies.length || j < this.queriedShows.length;) {
              if (i < this.queriedMovies.length) {
                tempArray.push(this.queriedMovies[i++]); 
              }
              if (j < this.queriedShows.length) {
                tempArray.push(this.queriedShows[j++]);
              }
            }
            this.resultadosBusqueda = tempArray;
          }
        });
      }
    });    
  }  

  private  searchResults():void{
    this.resultadosBusquedaService.searchMovies.subscribe({
      next: (data: any) => {
        this.queriedMovies = data; 

        this.resultadosBusquedaService.searchSeries.subscribe(
          (data: any) => {
            this.queriedShows = data;  

            let tempArray = [];
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
      }
    }); 
  }
}
