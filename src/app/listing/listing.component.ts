import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {Movie, MovieState} from '../app.model';
import { Store } from '@ngrx/store';
import {AppState} from "../app.state";
import * as BookingActions from '../store/booking.action'
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  bookings: Observable<MovieState>;
  searchterm:string;
  constructor(private store:Store<AppState>) { 
    this.bookings = store.select(state => state.bookings);
    this.bookings.subscribe(data=>{
      console.log('store',data);
    })
  }

  ngOnInit(): void {
    this.store.dispatch(new BookingActions.LoadMovies());
  }

}
