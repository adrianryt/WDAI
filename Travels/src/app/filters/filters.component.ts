import { ITravel } from './../ITravel';
import { travels } from './../travels';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

@Input() minimalPrice = 0;
@Input() maximalPrice = 0;
@Input() travels: ITravel[] = [];
@Input() Countries = new Array();
startDate = new Date(2020, 1, 1);
markedStartDate = new Date(2020, 1, 1);
markedEndDate = new Date(2050, 12, 31);

newMinimalPrice = 0;
newMaximalPrice = this.maximalPrice;
filteredCountries: string[] = [];

@Output() newMinPrice = new EventEmitter<number>();
@Output() newMaxPrice = new EventEmitter<number>();
@Output() newCountries = new EventEmitter<string[]>();
@Output() newStartDate = new EventEmitter<Date>();
@Output() newEndDate = new EventEmitter<Date>();



ngOnInit(): void {
  for(let travel of this.travels){
    if(!this.Countries.includes(travel.country)){
      this.Countries.push(travel.country);
    }
  }
  this.newMaximalPrice = this.maximalPrice;
  this.newMaxPrice.emit(this.newMaximalPrice);
}

ngOnChanges(changes: SimpleChanges): void{
  this.Countries = [];
  for (let travel of this.travels){
    if (!this.Countries.includes(travel.country)){
      this.Countries.push(travel.country);
    }
  }
  this.newCountries.emit(this.Countries);
}

changeMin(event: any){
  this.newMinimalPrice = parseInt(event.target.value, 10);
  this.newMinPrice.emit(this.newMinimalPrice);
}

changeMax(event: any){
  this.newMaximalPrice = parseInt(event.target.value, 10);
  this.newMaxPrice.emit(this.newMaximalPrice);
}
changeCountry(event: any): void{
  if(event.target.checked){
    this.filteredCountries.push(event.target.name);
  }
  else{
    this.removeCountry(event.target.name);
  }
  this.newCountries.emit(this.filteredCountries);
}

removeCountry (country: string){
  for (let i = 0; i < this.filteredCountries.length; i++){
    if (this.filteredCountries[i] === country){
      this.filteredCountries.splice(i, 1);
    }
  }
}

changeStartDate(event: any): void{
  this.markedStartDate = event.target.value;
  this.newStartDate.emit(this.markedStartDate);
}

changeEndDate(event: any): void{
  this.markedEndDate = event.target.value;
  this.newEndDate.emit(this.markedEndDate);
}
}
