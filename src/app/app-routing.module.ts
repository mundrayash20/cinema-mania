  
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {DescriptionComponent} from './description/description.component';
import {ListingComponent} from './listing/listing.component';
import {SeatSelectionComponent} from './seat-selection/seat-selection.component';
  import { from } from 'rxjs';
  import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';


const appRoutes: Routes = [
  { path: '', component:  ListingComponent},
    { path: 'description/:id', component:  DescriptionComponent},
    { path: 'seat-selection/:movie_id/:id', component:  SeatSelectionComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes,{scrollPositionRestoration: 'enabled'})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

constructor(router:Router) {
  router.events.forEach((event) => {
    if(event instanceof NavigationEnd) {
      console.log("route",event)
      window.scrollTo(0, 0)
    }
  });
}
}