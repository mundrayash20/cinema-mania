import { Component, OnInit,OnChanges } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie, MovieState, Order, Seat, Theatre } from '../app.model';
import { AppState } from '../app.state';
import { MovieService } from '../movies.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  id: string;
  movie_id: string;
  bookings:Observable<MovieState>;
  count:number=0;
  price:number=0;
  totalprice:number=0;
  theatre:Theatre;
  seats:Array<Seat>=[];
  orderStatus:boolean=false;
  orderdetails:Order;
  bookingsCopy:MovieState;


  constructor( private route: ActivatedRoute,private movieService: MovieService,private store:Store<AppState>) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.movie_id = this.route.snapshot.paramMap.get('movie_id');
    this.movieService.setMovie(this.movie_id);
    this.movieService.setTheatre(this.id,this.movie_id);
   
  }
  confirmSeat(){
    let time = new Date("2016-01-16T16:00:00").getTime();
    let Selectedseats=this.seats.filter(obj=>obj.selected).map(function(elem){
      return elem.name;
  }).join(",");
   
  console.log(Selectedseats);
    this.orderdetails=
    {id:this.movie_id+'*'+this.id+'*'+time,
    movie:this.bookingsCopy.selected.movie.name,
    theatre:this.bookingsCopy.selected.theatre.name,
    price:this.totalprice,
    seat:Selectedseats,
  }
    this.seats=this.seats.map(obj=>{
      if(obj.selected){
      return {name: obj.name, status:false}
    }else{
      return {name: obj.name, status: obj.status}
    }
  })

  this.movieService.confirmSeat(this.id,this.movie_id,this.seats,this.orderdetails);
   this.orderStatus=true;
  }
  seatSelected(i:number){
if(this.seats[i].status){
  this.seats[i].selected=!this.seats[i].selected
  this.count=this.seats.filter((obj)=>{return obj.selected} ).length;
  this.totalprice=this.count*this.price;
}
  }

  ngOnInit(): void {
  
    this.bookings = this.store.select(state => state.bookings);
    this.bookings.subscribe(data=>{
      if(data.status.theatreSelected){
      this.seats=data.selected.theatre.seat
      this.seats =this.seats.map(obj=> ({ ...obj, selected: false }));
      this.price=data.selected.theatre.price;
      this.bookingsCopy=data;
    }
  })}

}