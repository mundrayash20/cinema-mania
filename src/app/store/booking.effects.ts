import * as BookingActions from './booking.action'
import { Injectable } from '@angular/core';
import { Actions,Effect, createEffect, ofType } from '@ngrx/effects';
import { EMPTY,of } from 'rxjs';
import { switchMap,map, mergeMap, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from "@angular/common/http";
import {MovieState} from '../app.model';
import { AngularFirestore } from '@angular/fire/firestore';
import {MovieService} from '../movies.service'



@Injectable()
export class BookingEffects {
    constructor(private actions$:Actions,private movieService: MovieService){
    }
    loadMovies$ = createEffect(() => this.actions$
    .pipe(
      ofType(BookingActions.LOAD_MOVIES),
      mergeMap(
        () =>  this.movieService.getMovies()
          .pipe(
            map((data:any) => {
                
              return new BookingActions.LoadMovieSuccess(data)
              
            }),
            catchError(error => of(new BookingActions.LoadMovieFail(error)))
          )
      ),
  )
)}