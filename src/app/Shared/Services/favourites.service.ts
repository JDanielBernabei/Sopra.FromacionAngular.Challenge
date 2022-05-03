import { Injectable } from '@angular/core';
import { DetailsMovieApiResponse, DetailsSeriesApiResponse } from '../Models/DetailsAPIs';
import { SearchMoviesList, SearchSeriesList } from '../Models/SearchAPIs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  myFavourites: (SearchMoviesList | SearchSeriesList)[] = [];

  constructor() { }

  addFavourite(message: DetailsMovieApiResponse | DetailsSeriesApiResponse) { 
    this.myFavourites.push(message);    
  }

  inFavourites(message: DetailsMovieApiResponse | DetailsSeriesApiResponse): boolean { 
    for(let i = 0; i<this.myFavourites.length; i++)  {
      if (this.myFavourites[i].id == message.id){
        return true;
      }
    }
    return false;
  }
}


