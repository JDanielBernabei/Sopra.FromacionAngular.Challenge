import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.scss']
})
export class BarraBusquedaComponent{

  constructor(private route:Router) { }

  searchQuery(keyword : string){  
    this.clearOldSearches();
    let temp: any = localStorage.getItem('searchHistory');
    let searches: any[] = [];
    if (temp != null && temp[0] != null){
      searches = JSON.parse(temp);
      searches.push({date: new Date().getTime(), search: keyword})
      localStorage.setItem('searchHistory', JSON.stringify(searches));
    } 
    this.route.navigate(['search/' + keyword]); 
  }

  clearOldSearches(){
    let temp: any = localStorage.getItem('searchHistory');
    let searches: any[] = [];
    if (temp == null || temp[0] == null){
      return;
    } 
    searches = JSON.parse(temp);
    for(let i = searches.length - 1; i >=0; i--){
      if (searches[i].date > new Date().getTime()*60*60*1000){
        searches.pop();
      } else{
        break;
      }
    }
    localStorage.clear();
    localStorage.setItem('searchHistory', JSON.stringify(searches));
  }

}
