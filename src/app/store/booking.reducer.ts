import { Action, select } from '@ngrx/store'
import { MovieState } from '../app.model'
import * as BookingActions from './booking.action'

// Section 1
const initialState: MovieState = {
    movies:[],
    selected:{
        movie:{
        },
    theatre:{},
    seats:[]
    },
    status:{
        movieSelected:false,
        theatreSelected:false,
        seatSelected:false,
    }
    
}

// Section 2
export function BookingReducer(state: MovieState = initialState, action: BookingActions.Actions) {

    // Section 3
    switch(action.type) {
        case BookingActions.LOAD_MOVIES:
            return {...state};
        case BookingActions.LOAD_MOVIES_SUCCESS:{
            let movie=state.selected.movie,
            theatre=state.selected.theatre,
            seat=state.selected.seats;
            if(state.selected.movie.id){
                   movie=action.payload.find(obj => {
                    return obj.id == state.selected.movie.id
                  })

                  if(state.selected.theatre.id){
                    theatre=movie.theatre.find(obj => {
                       return obj.id == state.selected.theatre.id
                     })

                     seat=theatre.seat;
               }
               return {...state,movies:[...action.payload],selected:{movie:movie,theatre:theatre,seat:seat}}
            }
            else{
                return {...state,movies:[...action.payload]}
            }

            }
           
        case BookingActions.LOAD_MOVIES_FAIL:
             return {...state,error: action.payload}
        case BookingActions.SET_MOVIE:
            return {...state,selected:{...state.selected,movie:action.payload},status:{...state.status,movieSelected:true}};
        case BookingActions.SET_THEATRE:
            return {...state,selected:{...state.selected,theatre:action.payload},status:{...state.status,theatreSelected:true}};
        case BookingActions.SET_SEATS:
            return {...state,selected:{...state.selected,seats:action.payload}};
        default:
            return state;
    }
}