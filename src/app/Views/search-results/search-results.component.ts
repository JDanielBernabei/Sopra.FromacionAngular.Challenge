import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { DiscoverMoviesApiResponse, DiscoverMoviesList, DiscoverSeriesApiResponse, DiscoverSeriesList } from 'src/app/Shared/Models/DiscoverAPIs';
import { SearchMoviesApiResponse, SearchMoviesList, SearchSeriesApiResponse, SearchSeriesList } from 'src/app/Shared/Models/SearchAPIs';
import { ClientHttpService } from 'src/app/Shared/Services/client-http.service';
import {ResultadosBusquedaService} from 'src/app/Shared/Services/resultados-busqueda.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  pageTitle = ""; 

  queriedMovies: (DiscoverMoviesApiResponse | SearchMoviesApiResponse) = {} as DiscoverMoviesApiResponse;      
  queriedSeries: (DiscoverSeriesApiResponse | SearchSeriesApiResponse) = {} as DiscoverSeriesApiResponse;       
  resultadosBusqueda: (SearchMoviesList | SearchSeriesList)[] = [];
  page: string | null = null;
  searchQuery: string | null = null;
  totalPages: number = 0;  
  currentPage: number = 0; 

  constructor(private resultadosBusquedaService: ResultadosBusquedaService, private router: Router, private route: ActivatedRoute, private clientHttpService: ClientHttpService){};

  ngOnInit(): void {
    //this.page = this.route.snapshot.paramMap.get('page');
    //
    //if (this.router.url.includes("/movies")){
    //  this.pageTitle = "Movies";      
    //  this.retrievePopularMovies(this.page);
    //} else if (this.router.url.includes("/series")){
    //  this.pageTitle = "Series";
    //  this.retrievePopularSeries(this.page);
    //} else if (this.router.url.includes("/search")){
    //  this.pageTitle = "Resultados Búsqueda";
    //  this.searchResults(this.page);
    //} else if (this.router.url.includes("/myList")){
    //  this.pageTitle = "Mi Lista";
    //  this.myList();
    //} else {
    //  this.pageTitle = "Descubre";
    //  this.retrievePopular(this.page);      
    //}    

    this.route.params.subscribe({                                   // -> parametros de app-routing        
      next: ( ) => { 
        this.route.queryParams.subscribe({
          next: (hola:any) => {                                     // -> parametros de ?, que son especificos para esta ruta de app-routing
            console.log("queryParams");
            console.log(hola.page);
            this.page = hola.page;
            this.searchQuery = this.route.snapshot.paramMap.get('searchQuery');

            if (this.router.url.includes("/movies")){
              this.pageTitle = "Movies";      
              this.retrievePopularMovies(this.page);
            } else if (this.router.url.includes("/series")){
              this.pageTitle = "Series";
              this.retrievePopularSeries(this.page);
            } else if (this.router.url.includes("/search")){
              this.pageTitle = "Resultados Búsqueda";
              this.searchResults(this.page);
            } else if (this.router.url.includes("/myList")){
              this.pageTitle = "Mi Lista";
              this.myList();
            } else {
              this.pageTitle = "Descubre";
              this.retrievePopular(this.page);      
            }    
          }
        });   
        //console.log("routeParams");
        //console.log(routeParams);    
        //this.page = this.route.snapshot.paramMap.get('page');
        //this.searchQuery = this.route.snapshot.paramMap.get('searchQuery');
        //
        //if (this.router.url.includes("/movies")){
        //  this.pageTitle = "Movies";      
        //  this.retrievePopularMovies(this.page);
        //} else if (this.router.url.includes("/series")){
        //  this.pageTitle = "Series";
        //  this.retrievePopularSeries(this.page);
        //} else if (this.router.url.includes("/search")){
        //  this.pageTitle = "Resultados Búsqueda";
        //  this.searchResults(this.page);
        //} else if (this.router.url.includes("/myList")){
        //  this.pageTitle = "Mi Lista";
        //  this.myList();
        //} else {
        //  this.pageTitle = "Descubre";
        //  this.retrievePopular(this.page);      
        //}    
      }
    });
  };

  private myList(): void{
    let temp = localStorage.getItem('myFavourites');
    temp != null? this.resultadosBusqueda = JSON.parse(temp) : this.resultadosBusqueda = [];   
  }

  private retrievePopularMovies(page: string | null):void{
    this.clientHttpService.getPopularMovies(page).subscribe({
      next: (data : DiscoverMoviesApiResponse) => { 
        this.resultadosBusqueda = data.results;
        this.totalPages = data.total_pages; 
        this.currentPage = data.page;
      },
      error: () => {console.log("failure");}
    });    
  }

  private retrievePopularSeries(page: string | null): void{
    this.clientHttpService.getPopularSeries(page).subscribe({
      next: (data : DiscoverSeriesApiResponse) => { 
        console.log(data);
        this.resultadosBusqueda = data.results;
        this.totalPages = data.total_pages; 
        this.currentPage = data.page;
      },
      error: () => {console.log("failure");}
    });
  }

  private  retrievePopular(page: string | null):void{
    this.clientHttpService.getPopularMovies(page).subscribe({
      next: (data: DiscoverMoviesApiResponse) => {        
        this.queriedMovies = data;       
        
        console.log(page);
        console.log(this.queriedMovies);
        
        this.clientHttpService.getPopularSeries(page).subscribe({
          next: (data: DiscoverSeriesApiResponse) => {
            this.queriedSeries = data;  

            let tempArray = [];
            for (var i=0, j=0, k=0; i < this.queriedMovies.results.length || j < this.queriedSeries.results.length;) {
              if (i < this.queriedMovies.results.length) {
                tempArray.push(this.queriedMovies.results[i++]); 
              }
              if (j < this.queriedSeries.results.length) {
                tempArray.push(this.queriedSeries.results[j++]);
              }
            }
            this.resultadosBusqueda = tempArray;
            this.totalPages = this.queriedMovies.total_pages + this.queriedSeries.total_pages; 
            this.currentPage = this.queriedMovies.page;
          }
        });
      }
    });    
  }  

  private  searchResults(page: string | null):void{
    //this.resultadosBusquedaService.searchMovies.subscribe({
    //  next: (data: SearchMoviesApiResponse) => {
    //    this.queriedMovies = data; 
    //
    //    this.resultadosBusquedaService.searchSeries.subscribe(
    //      (data: SearchSeriesApiResponse) => {
    //        this.queriedSeries = data;  
    //
    //        let tempArray = [];
    //        for (var i=0, j=0, k=0; i < this.queriedMovies.results.length || j < this.queriedSeries.results.length;) {
    //          if (i < this.queriedMovies.results.length) {
    //            tempArray.push(this.queriedMovies.results[i++]);
    //          }
    //          if (j < this.queriedSeries.results.length) {
    //            tempArray.push(this.queriedSeries.results[j++]);
    //          }
    //        }
    //        this.resultadosBusqueda = tempArray;
    //      }
    //    );
    //  }
    //}); 

    //this.router.events.subscribe({
    //  next: () => {
    //    let searchQuery = this.route.snapshot.paramMap.get('searchQuery');
    //    if (searchQuery != null){
    //      this.clientHttpService.getMoviesByQuery(searchQuery, page).subscribe({   
    //        next: (data : SearchMoviesApiResponse) => { 
    //          this.queriedMovies = data; 
    //          if (searchQuery != null){
    //            this.clientHttpService.getShowsByQuery(searchQuery, page).subscribe({
    //              next: (data : SearchSeriesApiResponse) => {  
    //                this.queriedSeries = data;        
    //                
    //                let tempArray = [];
    //                for (var i=0, j=0, k=0; i < this.queriedMovies.results.length || j < this.queriedSeries.results.length;) {
    //                  if (i < this.queriedMovies.results.length) {
    //                    tempArray.push(this.queriedMovies.results[i++]);
    //                  }
    //                  if (j < this.queriedSeries.results.length) {
    //                    tempArray.push(this.queriedSeries.results[j++]);
    //                  }
    //                }
    //                this.resultadosBusqueda = tempArray;
    //              },
    //              error: () => {console.log("failure");}
    //            });
    //          }
    //        },
    //        error: () => {console.log("failure");}
    //      });      
    //    }
    //  }
    //});

    let searchQuery = this.route.snapshot.paramMap.get('searchQuery');      
    if (searchQuery != null){
      this.clientHttpService.getMoviesByQuery(searchQuery, page).subscribe({   
        next: (data : SearchMoviesApiResponse) => { 
          this.queriedMovies = data; 
          if (searchQuery != null){
            this.clientHttpService.getShowsByQuery(searchQuery, page).subscribe({
              next: (data : SearchSeriesApiResponse) => {  
                this.queriedSeries = data;        
                
                let tempArray = [];
                for (var i=0, j=0, k=0; i < this.queriedMovies.results.length || j < this.queriedSeries.results.length;) {
                  if (i < this.queriedMovies.results.length) {
                    tempArray.push(this.queriedMovies.results[i++]);
                  }
                  if (j < this.queriedSeries.results.length) {
                    tempArray.push(this.queriedSeries.results[j++]);
                  }
                }
                this.resultadosBusqueda = tempArray;
                this.totalPages = this.queriedMovies.total_pages + this.queriedSeries.total_pages; 
                this.currentPage = this.queriedMovies.page;
              },
              error: () => {console.log("failure");}
            });
          }
        },
        error: () => {console.log("failure");}
      });      
    }
  }

  changeCurrentPage(num:number){
    //this.router.navigate([this.router.url + "/" + this.currentPage], 
    //); 
    this.router.navigate([], 
      {
        relativeTo: this.route,
        queryParams: {page: this.currentPage+num}, 
        queryParamsHandling: 'merge', 
      }
    ); 
  }
}

