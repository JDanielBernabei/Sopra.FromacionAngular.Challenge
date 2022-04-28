import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClientHttpService } from 'src/app/Shared/Services/client-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  slides: string [] = ['../../../assets/Patatas/3patatas.jpg','../../../assets/Patatas/muchaspatatas.jpg','../../../assets/Patatas/3patatas.jpg','../../../assets/Patatas/muchaspatatas.jpg'];
  slideIndex=0;
  currentSlide : string = "";

  peliculasPopulares: any[] = [];
  seriesPopulares: any [] = [];
  
  constructor(private clientHttpService: ClientHttpService) { }

  ngOnInit(): void {
    this.ElementosPopulares();
    
    this.showSlidesAuto();
  }


  private ElementosPopulares(): void{
    this.clientHttpService.getPopularMovies().subscribe(
      (data : any) => { 
        this.peliculasPopulares = data.results;
        this.slides[0] = "https://www.themoviedb.org/t/p/original" + this.peliculasPopulares[0].backdrop_path;
        this.slides[2] = "https://www.themoviedb.org/t/p/original" + this.peliculasPopulares[1].backdrop_path; 
      },
      (error) => {
        console.log("failure");
      }
    )

    this.clientHttpService.getPopularSeries().subscribe(
      (data : any) => { 
        this.seriesPopulares = data.results;
        this.slides[1] = "https://www.themoviedb.org/t/p/original" + this.seriesPopulares[0].backdrop_path;
        this.slides[3] = "https://www.themoviedb.org/t/p/original" + this.seriesPopulares[1].backdrop_path; 
      },
      (error) => {
        console.log("failure");
      }
    )
  }

  getSlide() {    
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
