import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
//import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class ClientHttpService {

  baseUrl: string = "https://api.themoviedb.org/";
  peliculasAPI: string = "3/discover/movie?";
  apiKey: string = "api_key=1e271bc9560db07a62290e00962de546";

  //this.params"&primary_release_date.gte=2022-01-25"


  //constructor(private httpClient: HttpClient, public datepipe: DatePipe) { }
  constructor(private httpClient: HttpClient) { }

  public PeliculasPopulares(): Observable<any>{
    //timeInterval = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    //return this.httpClient.get<any>(this.baseUrl + this.peliculasAPI + this.apiKey, {params: new HttpParams().set('primary_release_date.gte',  timeInterval)});
    return this.httpClient.get<any>("https://api.themoviedb.org/3/discover/movie?api_key=1e271bc9560db07a62290e00962de546&primary_release_date.gte=2022-01-25");
  }

  public SeriesPopulares(){

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
