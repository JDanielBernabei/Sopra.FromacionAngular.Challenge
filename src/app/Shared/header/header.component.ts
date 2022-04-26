import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isShown: boolean = false ;
  closeModalLocation = false;

  constructor() {}
  
  ngOnInit() {

    this.ToggleModal();    
  }

  ToggleModal(this: any) {  
    this.isShown = ! this.isShown;
  }
  
}
