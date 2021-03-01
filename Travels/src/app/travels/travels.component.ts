import { ITravel } from './../ITravel';
import { travels } from './../travels';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.css']
})
export class TravelsComponent implements OnInit{
  travels!: ITravel[];
  participantSum: number = 0;
  minimalPrice: number = 0; //min max from Travels
  maximalPrice: number = 0;
  defaultDate = new Date();
  CountriesToSendToFilter = new Array();
  Countries = new Array();

  //filter values
  filterMinPrice: number = 0;
  filterMaxPrice: number = 0;
  filterCountries: string[] = [];
  filterStartDate: Date = new Date();
  filterEndDate: Date = new Date();


  constructor(private travelsService: TravelService) {
    this.getTravelList();
  }

  ngOnInit(): void {
    this.getTravelList();
  }

  getTravelList(){
    this.travelsService.getTravelList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe(travels =>{
      this.travels = travels;
      this.changeDates();
    });

  }

  changeDates(){
    this.travels.forEach(travel =>{
      travel.start_date = new Date(travel.start_date.seconds * 1000);
      travel.end_date = new Date(travel.end_date.seconds * 1000);
    });
    this.setMaxMinPrice();
  }


  addReservation(index: number){
    this.participantSum+=1;
  }

  removeReservation(index: number){
    this.participantSum-=1;

  }

  minPrice(price: number){
    let travelsCopy = [...this.travels];
    return price === travelsCopy.sort((a, b) => a.price - b.price)[0].price;
  }

  maxPrice(price: number){
    const travelsCopy = [...this.travels];
    return price === travelsCopy.sort((a, b) => a.price - b.price)[travelsCopy.length - 1].price;
  }

  setMaxMinPrice(){
    const copyOfTravels = [...this.travels];
    this.minimalPrice = copyOfTravels.sort((a, b) => a.price - b.price)[0].price;
    this.maximalPrice = copyOfTravels.sort((a, b) => a.price - b.price)[copyOfTravels.length - 1].price;
  }

  deleteTravel(index: number, travel: ITravel): void{
    this.travelsService.deleteTravel(travel.name);
    this.setMaxMinPrice();
  }

  changeParticipants(event: any){
  }

  addTravel(event: any){
    this.travels = event;
    this.setMaxMinPrice();

    for (let travel of this.travels){
      if (!this.Countries.includes(travel.country)){
        this.Countries.push(travel.country);
      }
    }
    this.CountriesToSendToFilter = this.Countries;
  }

  newMinPriceFromFilter(event: any){
    this.filterMinPrice = event;
  }

  newMaxPriceFromFilter(event: any){
    this.filterMaxPrice = event;
  }

  newChoosenCountries(event: any){
    this.filterCountries = event;
  }

  newStartDate(event: any){
    this.filterStartDate = event;
    alert(this.filterStartDate);
  }
  newEndDate(event: any){
    this.filterEndDate = event;
  }


  travelValidationWithFilters(travel: ITravel): boolean{
    if (travel.price > this.filterMaxPrice){
      return false;
    }
    if (travel.price < this.filterMinPrice){
      return false;
    }
    if (!this.filterCountries.includes(travel.country)){
     return false;
    }

    return true;
  }
}
