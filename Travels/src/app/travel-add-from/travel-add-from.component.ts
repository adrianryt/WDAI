import { travels } from './../travels';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelService } from '../services/travel.service';

@Component({
  selector: 'app-travel-add-from',
  templateUrl: './travel-add-from.component.html',
  styleUrls: ['./travel-add-from.component.css']
})
export class TravelAddFromComponent implements OnInit{

  modelForm: FormGroup;

  @Input() participantCounter = new Array();
  @Input() travels = travels;

  @Output() participants = new EventEmitter<Array<number>>();
  @Output() newTravels = new EventEmitter<typeof travels>();

  constructor(private formBuilder : FormBuilder, private travelsService: TravelService) {
    for(let travel of this.travels){
      this.participantCounter.push(0);
    }
    this.modelForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      country: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      capacity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: ['', Validators.required],
      img_link: ['', Validators.required]
    });
  }

  formErrors = {
    name: '',
    country: '',
    start_date: '',
    end_date: '',
    price: '',
    capacity: '',
    description: '',
    img_link: ''
  }


  onSubmit(modelForm: FormGroup) : void {
    for (let field in this.formErrors){
      if (!modelForm.controls[field].valid){
        alert('Wrong data in ' + field);
        return;
      }
    }
    if (!(new Date(modelForm.value['start_date']) < new Date(modelForm.value['end_date']))){
      alert('End date cannot be greater than start date');
      return;
    }
    this.participantCounter.push(0);
    this.travels.push({name: modelForm.value['name'],
                     country: modelForm.value['country'],
                     start_date: new Date(modelForm.value[ 'start_date' ]),
                     end_date: new Date(modelForm.value['end_date']),
                     price: modelForm.value['price'],
                     capacity: modelForm.value['capacity'],
                     description: modelForm.value['description'],
                     img_link: modelForm.value['img_link']
    });
    this.participants.emit(this.participantCounter);
    this.newTravels.emit(this.travels);

    const newTravel = {
      name: modelForm.value['name'],
      country: modelForm.value['country'],
      start_date: new Date(modelForm.value[ 'start_date' ]),
      end_date: new Date(modelForm.value['end_date']),
      price: modelForm.value['price'],
      reserved: 0,
      capacity: modelForm.value['capacity'],
      description: modelForm.value['description'],
      img_link: modelForm.value['img_link']
    }
    this.travelsService.createTravel(newTravel);
  }


  ngOnInit() : void{}


}
