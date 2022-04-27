import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class ClientHttpService {

  baseUrl: string = "https://api.themoviedb.org/";
  apiKey: string = "1e271bc9560db07a62290e00962de546";

  constructor(private httpClient: HttpClient, public datepipe: DatePipe) { }

  public getPopularMovies(): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("api_key", this.apiKey);
    let newDate = new Date();
    newDate.setMonth(newDate.getMonth() - 3);
    let timeInterval = this.datepipe.transform( newDate, 'yyyy-MM-dd');
    if (timeInterval != null){
      queryParams = queryParams.append("primary_release_date.gte", timeInterval);
    } else {
      timeInterval = "";
      queryParams = queryParams.append("primary_release_date.gte", timeInterval);
    } 
    return this.httpClient.get<any>(this.baseUrl + "3/discover/movie",{params:queryParams});
  }

  public getPopularSeries(): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("api_key", this.apiKey);
    let newDate = new Date();
    newDate.setMonth(newDate.getMonth() - 3);
    let timeInterval = this.datepipe.transform( newDate, 'yyyy-MM-dd');
    if (timeInterval != null){
      queryParams = queryParams.append("first_air_date.gte", timeInterval);
    } else {
      timeInterval = "";
      queryParams = queryParams.append("first_air_date.gte", timeInterval);
    } 
    return this.httpClient.get<any>(this.baseUrl + "3/discover/tv",{params:queryParams});
  }

  public getMoviesByQuery(stringBusqueda: string): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("api_key", this.apiKey);
    queryParams = queryParams.append("query", stringBusqueda);

    return this.httpClient.get<any>(this.baseUrl + "3/search/movie",{params:queryParams});
  }

  public getShowsByQuery(stringBusqueda: string): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("api_key", this.apiKey);
    queryParams = queryParams.append("query", stringBusqueda);

    return this.httpClient.get<any>(this.baseUrl + "3/search/search-tv-shows",{params:queryParams});
  }

  public Detalle(){

  }

}
