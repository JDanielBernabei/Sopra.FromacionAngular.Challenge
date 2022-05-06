import { Component} from '@angular/core';
import { DiscoverSeriesApiResponse, DiscoverMoviesList, DiscoverMoviesApiResponse, DiscoverSeriesList } from 'src/app/Shared/Models/DiscoverAPIs';
import { ClientHttpService } from 'src/app/Shared/Services/client-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {  
  slides: any[] = [];
  slideIndex = 0;

  peliculasPopulares = {} as DiscoverMoviesList[];
  seriesPopulares = {} as DiscoverSeriesList[];

  constructor(private clientHttpService: ClientHttpService) { }

  ngOnInit(): void {
    this.ElementosPopulares();
    
    this.showSlidesAuto();
  }

  getMedia(): string{
    if(this.slideIndex == 0 || this.slideIndex == 2) return "movie";
    else return "serie";
  }

  private ElementosPopulares(): void{
    this.clientHttpService.getPopularMovies().subscribe({
      next: (data : DiscoverMoviesApiResponse) => { 
        this.peliculasPopulares = data.results;
        this.slides[0] = this.peliculasPopulares[0];
        this.slides[2] = this.peliculasPopulares[1];
      },
      error: () => {console.log("failure");}
    });

    this.clientHttpService.getPopularSeries().subscribe({
      next: (data : DiscoverSeriesApiResponse) => { 
        this.seriesPopulares = data.results;
        this.slides[1] = this.seriesPopulares[0];
        this.slides[3] = this.seriesPopulares[1];
      },
      error: () => {console.log("failure");}
    });
  }

  getSlideBackdrop() {    
    return "https://www.themoviedb.org/t/p/w1280" + this.slides[this.slideIndex].backdrop_path;
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
