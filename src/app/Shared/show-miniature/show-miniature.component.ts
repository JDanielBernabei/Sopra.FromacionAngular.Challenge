import { Component, Input } from '@angular/core';
import { DiscoverMoviesList, DiscoverSeriesList } from '../Models/DiscoverAPIs';
import { SearchMoviesList, SearchSeriesList } from '../Models/SearchAPIs';

@Component({
  selector: 'app-show-miniature',
  templateUrl: './show-miniature.component.html',
  styleUrls: ['./show-miniature.component.scss']
})
export class ShowMiniatureComponent {

  @Input()
  show: DiscoverMoviesList | DiscoverSeriesList | SearchMoviesList | SearchSeriesList = {} as DiscoverMoviesList;

  poster_path?: string = '';
  title: string = '';
  vote_average: number = 0;
  stars: string = '../../../assets/img/0stars.jpg';  
  id: number = 0;
  media: string = '';

  constructor(){}

  ngOnInit(): void {   
    this.poster_path = "https://www.themoviedb.org/t/p/original" + this.show.poster_path;
    this.stars = '../../../assets/img/' + Math.floor(this.show.vote_average/2) + 'stars.jpg';
    if ("title" in this.show) {
      this.title = this.show.title;
      this.media = "movie";
    } else {
      this.title = this.show.name;
      this.media = "serie";
    }
    this.vote_average = this.show.vote_average;
    this.id = this.show.id;    
  }
}

