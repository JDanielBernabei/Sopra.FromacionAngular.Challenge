import { Component, OnInit } from '@angular/core';
import { ClientHttpService } from 'src/app/Shared/Services/client-http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  slides: string [] = ['','../../../assets/Patatas/muchaspatatas.jpg','','../../../assets/Patatas/3patatas.jpg'];
  slideIndex=0;
  captionText : string ="";
  currentSlide : string = "";
  //datospeliculasPopulares: any;

  constructor(private clientHttpService: ClientHttpService) { }

  private PeliculasPopulares(): void{
    this.clientHttpService.getPeliculasPopulares().subscribe(
      (data : any) => { 
        this.slides[0] = 'https://www.themoviedb.org/t/p/original' + data.results[0].poster_path;
        this.slides[2] = 'https://www.themoviedb.org/t/p/original' + data.results[1].poster_path;
      },
      (error) => {
        console.log("failure");
      }
    )
  }

  ngOnInit(): void {
    this.PeliculasPopulares();
    
    this.captionText = "Caption Text Test";   

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
