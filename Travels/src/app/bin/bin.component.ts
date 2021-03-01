import { travels } from './../travels';
import { Component, Input, OnInit } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { map } from 'rxjs/operators';
import { ITravel } from '../ITravel';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css']
})
export class BinComponent {

  travels!: ITravel[];


  constructor(private travelsService: TravelService) {
  }

  ngOnInit(): void {
    this.getTravelList();
  }

  getTravelList(){
    this.travelsService.getTravelList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe(travels =>{
      this.travels = travels;
    });

  }

  getSum(): number{
    let res = 0;
    for(let travel of this.travels){
      if(travel.reserved>0){
        res += travel.price * travel.reserved;
      }

    }
    return res;
  }
}
