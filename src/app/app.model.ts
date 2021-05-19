export interface Movie {
    id?:string;
    date?:string;
    description?:string;
    name?:string;
    poster?:string;
    time?:string;
    type?:string;
    theatre?:Array<any>;
  }
  export interface Theatre {
    id?:string;
    name?:string;
    price?:number;
    seat?:Array<Seat>;
  }
  export interface Seat {
    name?:string;
    status?:boolean;
    selected?:boolean;
  }

  export interface Order {
    id?:string;
    movie?:string;
    price?:number;
    seat?:string;
    theatre?:string;
  }

  export interface MovieState {
    movies:Array<Movie>,
    selected:{ movie:Movie,
        theatre:Theatre,
        seats:Array<Seat>}
    status:{
        movieSelected:boolean,
        theatreSelected:boolean,
        seatSelected:boolean,
    }
  }