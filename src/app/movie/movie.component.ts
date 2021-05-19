import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../app.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie:Movie;
  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    console.log('movieComponent',this.movie)
  }

}
