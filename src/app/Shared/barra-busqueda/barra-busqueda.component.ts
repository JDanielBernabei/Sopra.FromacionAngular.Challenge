import { Component } from '@angular/core';
import { ClientHttpService } from 'src/app/Shared/Services/client-http.service';
import {ResultadosBusquedaService} from 'src/app/Shared/Services/resultados-busqueda.service';
import {Router} from '@angular/router';
import { SearchMoviesApiResponse, SearchSeriesApiResponse } from '../Models/SearchAPIs';
import { compileDeclareNgModuleFromMetadata } from '@angular/compiler';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.scss']
})
export class BarraBusquedaComponent{

  constructor(private clientHttpService: ClientHttpService, private resultadosBusquedaService: ResultadosBusquedaService, private route:Router) { }

  searchQuery(keyword : string){  
    this.clearOldSearches();
    let temp: any = localStorage.getItem('searchHistory');
    let searches: any[] = [];
    if (temp != null && temp[0] != null){
      searches = JSON.parse(temp);
      searches.push({date: new Date().getTime(), search: keyword})
      localStorage.setItem('searchHistory', JSON.stringify(searches));
    } 

    this.clientHttpService.getMoviesByQuery(keyword).subscribe({   
      next: (data : SearchMoviesApiResponse) => { 
        this.resultadosBusquedaService.sendMoviesResults(data.results); 
      },
      error: () => {console.log("failure");}
    });
    this.clientHttpService.getShowsByQuery(keyword).subscribe({
      next: (data : SearchSeriesApiResponse) => {  
        this.resultadosBusquedaService.sendSeriesResults(data.results);             
      },
      error: () => {console.log("failure");}
    });  
    this.route.navigate(['search/' + keyword]); 
  }

  clearOldSearches(){
    let temp: any = localStorage.getItem('searchHistory');
    let searches: any[] = [];
    if (temp == null || temp[0] == null){
      return;
    } 
    searches = JSON.parse(temp);
    for(let i = searches.length - 1; i >=0; i--){
      if (searches[i].date > new Date().getTime()*60*60*1000){
        searches.pop();
      } else{
        break;
      }
    }
    localStorage.clear();
    localStorage.setItem('searchHistory', JSON.stringify(searches));
  }

}
