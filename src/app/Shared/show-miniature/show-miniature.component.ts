import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-miniature',
  templateUrl: './show-miniature.component.html',
  styleUrls: ['./show-miniature.component.scss']
})
export class ShowMiniatureComponent implements OnInit {
  @Input()
  poster_path: string = '';
  @Input()
  title: string = '';
  @Input()
  vote_average: number = 0;
  stars: string = '../../../assets/img/0stars.jpg';  

  constructor(){}

  ngOnInit(): void {   
    this.poster_path = "https://www.themoviedb.org/t/p/original"+this.poster_path;
    this.starsImage(this.vote_average);
  }

  starsImage(average: number){
    this.stars = '../../../assets/img/' + Math.floor(average/2) + 'stars.jpg';
  }

}

