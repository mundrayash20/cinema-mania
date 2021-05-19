import { Component, Input, OnInit } from '@angular/core';
import { Theatre } from 'src/app/app.model';

@Component({
  selector: 'app-theatres',
  templateUrl: './theatres.component.html',
  styleUrls: ['./theatres.component.css']
})
export class TheatresComponent implements OnInit {

  @Input()theatres:Array<Theatre>;
  @Input()movie_id:string;
  constructor() { }

  ngOnInit(): void {
  }

}
