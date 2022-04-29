import { Component, OnInit } from '@angular/core';
import { ClientHttpService } from 'src/app/Shared/Services/client-http.service';
import {ResultadosBusquedaService} from 'src/app/Shared/Services/resultados-busqueda.service';
import {Router} from '@angular/router';
import { SearchMoviesApiResponse, SearchSeriesApiResponse } from '../Models/SearchAPIs';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.scss']
})
export class BarraBusquedaComponent implements OnInit {

  constructor(private clientHttpService: ClientHttpService, private resultadosBusquedaService: ResultadosBusquedaService, private route:Router) { }

  ngOnInit(): void {
  }
  
  searchQuery(keyword : string){    
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

}
