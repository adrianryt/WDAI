import { travels } from './../travels';
import { ITravel } from './../ITravel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { TravelService } from '../services/travel.service';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html',
  styleUrls: ['./travel-details.component.css']
})
export class TravelDetailsComponent implements OnInit {
  travels: ITravel[] = [];
  travelName: string = '';
  travel!: ITravel;

  constructor(private route: ActivatedRoute, private travelService: TravelService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.travelName = param.id;
    });
    this.getTravel();
  }

  getTravel(){
    this.travelService.getTravelList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe(travels =>{
      this.travels = travels;
      for(let travel of this.travels){
        if(travel.name === this.travelName){
          this.travel = travel;
          this.changeDate();
        }
      }
    });
  }
  changeDate(){
    this.travel.start_date = new Date(this.travel.start_date.seconds * 1000);
    this.travel.end_date = new Date(this.travel.end_date.seconds * 1000);
  }

  addReservation(){
    this.travel.reserved+=1;
    this.travelService.updateTravel(this.travel.name, {reserved: this.travel.reserved} );
  }

  removeReservation(){
    this.travel.reserved-=1;
    this.travelService.updateTravel(this.travel.name, {reserved: this.travel.reserved} );
  }

  deleteTravel(): void{
    this.travelService.deleteTravel(this.travel.name);
    this.router.navigate(['../']);
  }
}
