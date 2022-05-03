import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowMiniatureComponent } from './Shared/show-miniature/show-miniature.component';
import { BarraBusquedaComponent } from './Shared/barra-busqueda/barra-busqueda.component';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { HomeComponent } from './Views/home/home.component';
import { SearchResultsComponent } from './Views/search-results/search-results.component';
import { DetailComponent } from './Views/detail/detail.component';
import { RatingComponent } from './Shared/rating/rating.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DetailComponent,
    SearchResultsComponent,
    ShowMiniatureComponent,
    BarraBusquedaComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
