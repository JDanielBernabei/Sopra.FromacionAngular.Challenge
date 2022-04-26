import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Views/home/home.component';
import { SearchResultsComponent } from './Views/search-results/search-results.component';
import { DetailComponent } from './Views/detail/detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'movies', component: SearchResultsComponent },
  { path: 'series', component: SearchResultsComponent },
  { path: 'show', component: DetailComponent },
  { path: 'myList', component: SearchResultsComponent },
  { path: 'myProfile', component: SearchResultsComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
