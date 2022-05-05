import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsMovieApiResponse, CreditsApiResponse, DetailsSeriesApiResponse, cast, genre, production_countries } from 'src/app/Shared/Models/DetailsAPIs';
import { ClientHttpService } from 'src/app/Shared/Services/client-http.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  element: DetailsMovieApiResponse | DetailsSeriesApiResponse = {} as DetailsMovieApiResponse;

  backdrop_path: string = '';
  title: string = '';
  release_date: string = '';
  runtime: string = '';
  vote_average: number = 0;
  production_countries: production_countries[] = [];
  genres: genre[] = [];
  overview: string = '';

  credits: cast[] = [];
  director: cast = {} as cast;

  constructor(private router: Router, private clientHttpService: ClientHttpService, private Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    let queryString=this.Activatedroute.snapshot.paramMap.get("id");
    if (queryString==null){return}
    if (this.router.url.includes("showDetail/movie/")){
      this.retrieveMovieDetails(queryString);
    } else {
      this.retrieveSerieDetails(queryString);      
    }     
  };

  inFavourites(): boolean{
    let temp = localStorage.getItem('myFavourites');
    let myFavourites: (DetailsMovieApiResponse | DetailsSeriesApiResponse)[] = [];
    if (temp == null || temp[0] == null){
      return false;      
    } else{
      myFavourites = JSON.parse(temp);
      for(let i = 0; i<myFavourites.length; i++)  {
        if (myFavourites[i].id == this.element.id && true){ //&& myFavourites[i] is the same kind of show as element
          return true;
        }
      }
      return false;
    } 
  }

  addFavourite(element: DetailsMovieApiResponse | DetailsSeriesApiResponse){
    let temp = localStorage.getItem('myFavourites');
    let myFavourites: (DetailsMovieApiResponse | DetailsSeriesApiResponse)[] = [];
    if (temp != null && temp[0] != null){
      myFavourites = JSON.parse(temp);
    } else{
      myFavourites = [];
    } 
    myFavourites.push(element);  
    localStorage.setItem('myFavourites', JSON.stringify(myFavourites));
  }

  private retrieveMovieDetails(queryString: string){
    this.clientHttpService.getMovieDetail(queryString).subscribe({
      next: (data : DetailsMovieApiResponse) => { 
        this.element = data;         

        this.backdrop_path = "https://www.themoviedb.org/t/p/original" + this.element.backdrop_path;      
        this.genres = this.element.genres;
        this.element.overview != null? this.overview = this.element.overview :  this.overview =  "";
        this.runtime = this.element.runtime;
        this.production_countries = this.element.production_countries;
        this.vote_average = this.element.vote_average;        
        this.title = this.element.title;
        this.release_date = this.element.release_date;
      },
      error: () => {console.log("failure");}
    });
    this.clientHttpService.getMovieCredits(queryString).subscribe({
      next: (data : CreditsApiResponse) => { 
        this.credits = data.cast;
        this.searchDirector();
      },
      error: () => {console.log("failure");}
    });
  }

  private retrieveSerieDetails(queryString: string){
    this.clientHttpService.getSerieDetail(queryString).subscribe({
      next: (data : DetailsSeriesApiResponse) => { 
        this.element = data;
        this.backdrop_path = "https://www.themoviedb.org/t/p/original" + this.element.backdrop_path;      
        this.genres = this.element.genres;
        this.element.overview != null? this.overview = this.element.overview :  this.overview =  "";
        this.element.episode_run_time[0] != null? this.runtime = this.element.episode_run_time[0].toString() : this.runtime = '?';
        this.production_countries = this.element.production_countries;
        this.vote_average = this.element.vote_average; 
        this.title = this.element.name;
        this.release_date = this.element.first_air_date;
      },
      error: () => {console.log("failure");}
    });  
    this.clientHttpService.getSerieCredits(queryString).subscribe({
      next: (data : CreditsApiResponse) => { 
        this.credits = data.cast;
        this.searchDirector();
      },
      error: () => {console.log("failure");}
    });    
  }

  private searchDirector(){
    for(var i=0; i<this.credits.length; i++){
      if (this.credits[i].known_for_department == "Directing"){
        this.director = this.credits[i];        
        break;
      }
    }
  }
}