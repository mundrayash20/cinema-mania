import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import {Movie, Seat, Theatre} from '../app.model';

export const LOAD_MOVIES       = '[MOVIES] Load Movies';
export const LOAD_MOVIES_SUCCESS       = '[MOVIES]LOAD_MOVIES_SUCESS';
export const LOAD_MOVIES_FAIL       = '[MOVIES]LOAD_MOVIES_FAIL';
export const SET_MOVIE   = '[MOVIES] Set Movie';
export const SET_THEATRE   = '[MOVIES] Set Theatre';
export const SET_SEATS    = '[MOVIES] Set Seats';

export class LoadMovies implements Action {
    readonly type = LOAD_MOVIES
}
export class LoadMovieSuccess implements Action {
    readonly type = LOAD_MOVIES_SUCCESS

    constructor(public payload:Array<Movie>) {}
}
export class LoadMovieFail implements Action {
    readonly type = LOAD_MOVIES_FAIL

    constructor(public payload: Error) {}
}

export class SetMovie implements Action {
    readonly type = SET_MOVIE

    constructor(public payload:Movie) {}
}

export class SetTheatre implements Action {
    readonly type = SET_THEATRE

    constructor(public payload: any) {}
}

export class SetSeats implements Action {
    readonly type = SET_SEATS

    constructor(public payload: Seat) {}
}

export type Actions = LoadMovies |LoadMovieSuccess | LoadMovieFail | SetMovie | SetTheatre | SetSeats 