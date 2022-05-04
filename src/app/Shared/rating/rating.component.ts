import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input()
  vote_average: number = 0;

  isHover: boolean = false;
  stars: string = '../../../assets/img/0stars.png';

  star:string[] = ['emptyStar', 'emptyStar', 'emptyStar', 'emptyStar', 'emptyStar'];

  isShown: boolean = false;

  constructor() { }

  ngOnChanges(): void{
    this.stars = '../../../assets/img/' + Math.floor(this.vote_average/2) + 'stars.png';
  }

  ToggleModal(this: any) {  
    this.isShown = ! this.isShown;
  }
}
