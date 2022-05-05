import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common'
import { DetailsMovieApiResponse, DetailsSeriesApiResponse, CreditsApiResponse } from '../Models/DetailsAPIs';
import { DiscoverMoviesApiResponse, DiscoverSeriesApiResponse } from '../Models/DiscoverAPIs';
import { SearchMoviesApiResponse, SearchSeriesApiResponse } from '../Models/SearchAPIs';

@Injectable({
  providedIn: 'root'
})
export class ClientHttpService {

  baseUrl: string = "https://api.themoviedb.org/";
  apiKey: string = "1e271bc9560db07a62290e00962de546";

  constructor(private httpClient: HttpClient, public datepipe: DatePipe) { }

  public getPopularMovies(page?: string | null): Observable<DiscoverMoviesApiResponse>{
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
    if (page != null){
      queryParams = queryParams.append("page", page);
    } 
    return this.httpClient.get<DiscoverMoviesApiResponse>(this.baseUrl + "3/discover/movie",{params:queryParams});
  }

  public getPopularSeries(page?: string | null): Observable<DiscoverSeriesApiResponse>{
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
    if (page != null){
      queryParams = queryParams.append("page", page);
    }    
    return this.httpClient.get<DiscoverSeriesApiResponse>(this.baseUrl + "3/discover/tv",{params:queryParams});
  }

  public getMoviesByQuery(stringBusqueda: string, page?: string | null): Observable<SearchMoviesApiResponse>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("api_key", this.apiKey);
    queryParams = queryParams.append("query", stringBusqueda);
    if (page != null){
      queryParams = queryParams.append("page", page);
    } 
    return this.httpClient.get<SearchMoviesApiResponse>(this.baseUrl + "3/search/movie",{params:queryParams});
  }

  public getShowsByQuery(stringBusqueda: string, page?: string | null): Observable<SearchSeriesApiResponse>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("api_key", this.apiKey);
    queryParams = queryParams.append("query", stringBusqueda);
    if (page != null){
      queryParams = queryParams.append("page", page);
    }
    return this.httpClient.get<SearchSeriesApiResponse>(this.baseUrl + "3/search/tv",{params:queryParams});
  }

  public getMovieDetail(idBusqueda: string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("api_key", this.apiKey);
    queryParams = queryParams.append("query", idBusqueda);

    return this.httpClient.get<DetailsMovieApiResponse>(this.baseUrl + "3/movie/" + idBusqueda,{params:queryParams});
  }

  public getSerieDetail(idBusqueda: string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("api_key", this.apiKey);

    return this.httpClient.get<DetailsSeriesApiResponse>(this.baseUrl + "3/tv/" + idBusqueda,{params:queryParams});
  }

  public getMovieCredits(idBusqueda: string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("api_key", this.apiKey);
    queryParams = queryParams.append("query", idBusqueda);

    return this.httpClient.get<CreditsApiResponse>(this.baseUrl + "3/movie/" + idBusqueda + "/credits",{params:queryParams});
  }

  public getSerieCredits(idBusqueda: string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("api_key", this.apiKey);

    return this.httpClient.get<CreditsApiResponse>(this.baseUrl + "3/tv/" + idBusqueda + "/credits",{params:queryParams});
  }
}
