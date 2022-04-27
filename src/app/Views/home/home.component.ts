import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClientHttpService } from 'src/app/Shared/Services/client-http.service';
import { ShowMiniatureComponent, apiResponse } from 'src/app/Shared/show-miniature/show-miniature.component';
import {ResultadosBusquedaService} from 'src/app/Shared/Services/resultados-busqueda.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ResultadosBusquedaService]
})
export class HomeComponent implements OnInit {
  
  slides: string [] = ['../../../assets/Patatas/3patatas.jpg','../../../assets/Patatas/muchaspatatas.jpg','../../../assets/Patatas/3patatas.jpg','../../../assets/Patatas/muchaspatatas.jpg'];
  slideIndex=0;
  captionText : string ="";
  currentSlide : string = "";
  peliculasPopulares: any[] = [];
  seriesPopulares: ShowMiniatureComponent [] = [];

  queryString: string = "";
  resultadosBusqueda: any[] = [];
  queriedMovies: any[] = [];
  queriedShows: any[] = [];

  constructor(private clientHttpService: ClientHttpService, private resultadosBusquedaService: ResultadosBusquedaService) { }

  @Output() emitter:EventEmitter<any[]> = new EventEmitter<any[]>();
  searchQuery(keyword : string){    
    this.clientHttpService.getMoviesByQuery(keyword).subscribe(   
      (data : any) => { 
        this.queriedMovies = data.results;
        for (let i=0; i<this.queriedMovies.length; i++){
          this.resultadosBusqueda[i] = this.queriedMovies[i];
        }
        this.emitter.emit(this.resultadosBusqueda);
        //this.resultadosBusquedaService.sendSearchResults(this.resultadosBusqueda); 
      },
      (error) => {
        console.log("failure");
      }
    );
    

/*    this.clientHttpService.getShowsByQuery(this.queryString).subscribe(
      (data : any) => {  
        this.queriedShows = data.results;      
      },
      (error) => {
        console.log("failure");
      }
    )

    if (this.queriedMovies.length > this.queriedShows.length){
      for (let i=0; i<this.queriedShows.length; i+=2){
        this.resultadosBusqueda[i] = this.queriedMovies[i];
        this.resultadosBusqueda[i+1] = this.queriedShows[i];
      }
      for (let i=this.queriedShows.length; i<this.queriedMovies.length; i++){
        this.resultadosBusqueda[i] = this.queriedMovies[i];
      }
    } else{
      for (let i=0; i<this.queriedMovies.length; i+=2){
        this.resultadosBusqueda[i] = this.queriedMovies[i];
        this.resultadosBusqueda[i+1] = this.queriedShows[i];
      }
      for (let i=this.queriedMovies.length; i<this.queriedShows.length; i++){
        this.resultadosBusqueda[i] = this.queriedShows[i];
      }
    }*/
    
    //this.resultadosBusquedaService.sendSearchResults(this.resultadosBusqueda);   
    //window.location.href = 'search';
  }

  private ElementosPopulares(): void{
    this.clientHttpService.getElementosPopulares(this.clientHttpService.peliculasAPI, this.clientHttpService.peliculasDate).subscribe(
      (data : any) => { 
        this.peliculasPopulares = data.results;
        this.slides[0] = this.peliculasPopulares[0].poster_path;
        this.slides[2] = this.peliculasPopulares[1].poster_path; 
      },
      (error) => {
        console.log("failure");
      }
    )

    this.clientHttpService.getElementosPopulares(this.clientHttpService.seriesAPI, this.clientHttpService.seriesDate).subscribe(
      (data : apiResponse) => { 
        this.seriesPopulares = data.results;
        this.slides[1] = this.seriesPopulares[0].poster_path;
        this.slides[3] = this.seriesPopulares[1].poster_path; 
      },
      (error) => {
        console.log("failure");
      }
    )
  }

  ngOnInit(): void {
    this.ElementosPopulares();
    
    this.showSlidesAuto();
  }

  getSlide() {
    this.captionText = this.slideIndex.toString();
    return this.slides[this.slideIndex];
  }

  plusSlides(n: number) {    
    if ((this.slideIndex + n) >= this.slides.length) {
      this.slideIndex = 0;      
    } else if ((this.slideIndex + n) < 0) {
      this.slideIndex = this.slides.length - 1;
    } else {
      this.slideIndex += n;
    }
    
    this.captionText = this.slideIndex.toString();
  }

  showSlide(n: number) {
    this.slideIndex = n;
  }

  showSlidesAuto() {
    setTimeout(() => {
      this.plusSlides(1);
      this.showSlidesAuto();
    }, 5000);
  }
}
