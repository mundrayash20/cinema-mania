import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieState } from 'src/app/app.model';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  @Input() movie:string;
  @Input() theatre:string;
  bookings:Observable<MovieState>;
  constructor(private store:Store<AppState>) { 
    this.bookings = this.store.select(state => state.bookings);
  }
  ngOnInit(): void {
  }

}
