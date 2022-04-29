import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsMovieApiResponse, CreditsApiResponse, DetailsSeriesApiResponse } from 'src/app/Shared/Models/DetailsAPIs';
import { ClientHttpService } from 'src/app/Shared/Services/client-http.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  element: any;
  credits: any;
  director: any;

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

  private retrieveMovieDetails(queryString: string){
    this.clientHttpService.getMovieDetail(queryString).subscribe({
      next: (data : DetailsMovieApiResponse) => { 
        this.element = data;
        this.element.backdrop_path = "https://www.themoviedb.org/t/p/original" + this.element.backdrop_path;        
      },
      error: () => {console.log("failure");}
    });
    this.clientHttpService.getMovieCredits(queryString).subscribe({
      next: (data : CreditsApiResponse) => { 
        this.credits = data;
        this.director = this.searchDirector();
      },
      error: () => {console.log("failure");}
    });
  }

  private retrieveSerieDetails(queryString: string){
    this.clientHttpService.getSerieDetail(queryString).subscribe({
      next: (data : DetailsSeriesApiResponse) => { 
        this.element = data;
      },
      error: () => {console.log("failure");}
    });  
    this.clientHttpService.getSerieCredits(queryString).subscribe({
      next: (data : CreditsApiResponse) => { 
        this.credits = data;
        this.director = this.searchDirector();
      },
      error: () => {console.log("failure");}
    });    
  }

  private searchDirector(){
    for(var i=0; i<this.credits.length; i++){
      if (this.credits.cast[i].known_for_department == "Directing"){
        this.director = this.credits.cast[i];        
        break;
      }
    }
    console.log(this.director);
  }

  getStarsPath(): string{
    return '../../../assets/img/'+ Math.floor(this.element.vote_average/2) + 'stars.jpg';
  }
}