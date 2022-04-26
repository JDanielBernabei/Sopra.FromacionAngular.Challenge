import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { HeaderComponent } from './Shared/header/header.component';
import { DetailComponent } from './Views/detail/detail.component';
import { HomeComponent } from './Views/home/home.component';
import { SearchResultsComponent } from './Views/search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DetailComponent,
    HomeComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
