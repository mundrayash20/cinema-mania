import { MovieState } from './app.model';

export interface AppState {
  readonly bookings: MovieState;
}