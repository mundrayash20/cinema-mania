import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Movie, MovieState } from '../app.model';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movies.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  id: string;
  bookings:Observable<MovieState>;
  constructor(private route: ActivatedRoute,private movieService: MovieService,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.movieService.setMovie(this.id);
    this.bookings = this.store.select(state => state.bookings);
    
  }

}
