import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class ClientHttpService {

  baseUrl: string = "https://api.themoviedb.org/";
  peliculasAPI: string = "3/discover/movie?";
  apiKey: string = "1e271bc9560db07a62290e00962de546";

  constructor(private httpClient: HttpClient, public datepipe: DatePipe) { }

  public getPeliculasPopulares(): Observable<any>{
    // Cargamos la apikey en los parametros
    let queryParams = new HttpParams();
    queryParams = queryParams.append("api_key", this.apiKey);

    // Solo peliculas de los ultimos 3 meses 
    let newDate = new Date();
    newDate.setMonth(newDate.getMonth() - 3);
    let timeInterval = this.datepipe.transform( newDate, 'yyyy-MM-dd');
    if (timeInterval != null){
      queryParams = queryParams.append("primary_release_date.gte", timeInterval);
    } else {
      timeInterval = "";
      queryParams = queryParams.append("primary_release_date.gte", timeInterval);
    } 

    return this.httpClient.get<any>(this.baseUrl + this.peliculasAPI,{params:queryParams});
  }

  public SeriesPopulares(){
    // Cargamos la apikey en los parametros
    let queryParams = new HttpParams();
    queryParams = queryParams.append("api_key", this.apiKey);

    // Solo series de los ultimos 3 meses 
    let newDate = new Date();
    newDate.setMonth(newDate.getMonth() - 3);
    let timeInterval = this.datepipe.transform( newDate, 'yyyy-MM-dd');
    if (timeInterval != null){
      queryParams = queryParams.append("primary_release_date.gte", timeInterval);
    } else {
      timeInterval = "";
      queryParams = queryParams.append("primary_release_date.gte", timeInterval);
    } 

    return this.httpClient.get<any>(this.baseUrl + this.peliculasAPI,{params:queryParams});  
  }

  public BuscarPeliculas(){

  }

  public BuscarSeries(){

  }

  public BuscarTodo(){

  }

  public Detalle(){

  }

}
