import { Component, OnInit } from '@angular/core';
import { ClientHttpService } from 'src/app/Shared/Services/client-http.service';
import {ResultadosBusquedaService} from 'src/app/Shared/Services/resultados-busqueda.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.scss']
})
export class BarraBusquedaComponent implements OnInit {

  queryString: string = "";

  constructor(private clientHttpService: ClientHttpService, private resultadosBusquedaService: ResultadosBusquedaService, private route:Router) { }

  ngOnInit(): void {
  }

  
  searchQuery(keyword : string){    
    this.clientHttpService.getMoviesByQuery(keyword).subscribe(   
      (data : any) => { 
        this.resultadosBusquedaService.sendMoviesResults(data.results); 
      },
      (error) => {
        console.log("get getMoviesByQuery failure");
      }
    );
    this.clientHttpService.getShowsByQuery(this.queryString).subscribe(
      (data : any) => {  
        this.resultadosBusquedaService.sendSeriesResults(data.results);             
      },
      (error) => {
        console.log("get getShowsByQuery failure");
      }
    );  
    this.route.navigate(['search']); 
  }

}
