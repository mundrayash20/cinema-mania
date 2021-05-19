import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie, MovieState,Order,Seat,Theatre } from './app.model';
import { AppState } from './app.state';
import * as BookingActions from './store/booking.action'

@Injectable({
  providedIn: 'root'
})
export class MovieService {
bookings:Observable<MovieState>;
theatre:Theatre;
confirmSeatValue:Array<Seat>

  constructor(private Fstore:AngularFirestore,private http:HttpClient,private store:Store<AppState>) { }

  getMovies(){
  return this.Fstore.collection('movies').valueChanges({idField: 'id' });  
  }
  setMovie(id:string){

    this.Fstore.collection<Movie>('movies')
      .doc(id)
      .ref.get()
      .then((doc) => {
        if (doc.exists) {
          let movie = doc.data();
          movie.id=id;
          this.store.dispatch(new BookingActions.SetMovie(movie));
        } else {
          console.log('dosent exist');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  setTheatre(id:string,movie_id:string){
    this.Fstore.collection<Movie>('movies')
      .doc(movie_id)
      .ref.get()
      .then((doc) => {
        if (doc.exists) {
          let theatres = doc.data().theatre;
          theatres=theatres.filter(obj=>{return obj.id==id})
          this.theatre=theatres[0];
           this.store.dispatch(new BookingActions.SetTheatre(this.theatre));
        } else {
          console.log('dosent exist');
        }
      })
      .catch((err) => {
        console.error(err);
      });


//     this.bookings = this.store.select(state => state.bookings);
//     this.bookings.subscribe(data=>
//       { console.log('yy',data);
//     let theatres=data.selected.movie.theatre;
//      theatres=theatres.filter(obj=>{return obj.id==id})
//     this.theatre=theatres[0];
// console.log('tt',this.theatre);
// this.store.dispatch(new BookingActions.SetTheatre(this.theatre));

    // });
  }
  confirmSeat(id:string,movie_id:string,seats:Array<Seat>,orderdetails:Order){
       this.Fstore.collection<Movie>('movies')
      .doc(movie_id)
      .ref.get()
      .then((doc) => {
        if (doc.exists) {
          let data = doc.data();
          let index = data.theatre.findIndex(x => x.id ==id);
          data.theatre[index].seat=seats;
          
          this.Fstore.collection('movies').doc(movie_id).update(data);
          this.Fstore.collection('order').doc().set(orderdetails);
        } else {
          console.log('dosent exist');
        }
      })
      .catch((err) => {
        console.error(err);
      });

    //this.Fstore.collection('movies').doc(movie_id).set(doc.data());
  }
}