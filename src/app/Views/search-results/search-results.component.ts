import { Component, Input, OnInit } from '@angular/core';
import {ResultadosBusquedaService} from 'src/app/Shared/Services/resultados-busqueda.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  resultados: any[] = [];

  constructor(){};
  //constructor(resultadosBusquedaService: ResultadosBusquedaService) {
  //  resultadosBusquedaService.searchResults.subscribe(
  //    (data : any) => {
  //      this.resultadosBusqueda = data;
  //      console.log("data" + data);
  //    }); 
  //}

  @Input() resultadosBusqueda:any;
  ngOnInit(): void {
    this.resultados = this.resultadosBusqueda;
    console.log(this.resultadosBusqueda);
  }
  ngDoCheck(){
    this.resultados = this.resultadosBusqueda;
    console.log(this.resultadosBusqueda);
  }

}
