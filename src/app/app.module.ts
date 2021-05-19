import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore'; 
import { AppComponent } from './app.component';

import { ListingComponent } from './listing/listing.component';
import { DescriptionComponent } from './description/description.component';
import { Store, StoreModule } from '@ngrx/store';
import { TheatresComponent } from './components/theatres/theatres.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MovieComponent } from './movie/movie.component';
import { HttpClientModule } from '@angular/common/http';
import { BookingReducer } from './store/booking.reducer';
import { BookingEffects } from './store/booking.effects';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { movieFilterPipe } from './movie-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListingComponent,
    MovieComponent,
    DescriptionComponent,
    BreadcrumbComponent,
    TheatresComponent,
    SeatSelectionComponent,
    movieFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'moviedb'),
    AngularFirestoreModule,
    HttpClientModule,
    StoreModule.forRoot({bookings: BookingReducer}),
    EffectsModule.forRoot([BookingEffects]),
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
