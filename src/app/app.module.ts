import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MovieService } from './services/movie.service';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './components/list/list.component';
import { MoreInfoComponent } from './components/more-info/more-info.component';
import { LinkService } from './services/link.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent,
    MoreInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    GraphQLModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
  ],
  providers: [MovieService, LinkService],
  bootstrap: [AppComponent],
})
export class AppModule {}
