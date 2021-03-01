import { ITravel } from './../ITravel';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private dbPath = 'travels';

  private travelRef: AngularFirestoreCollection<ITravel>;

  constructor(private db: AngularFirestore) {
    this.travelRef = db.collection(this.dbPath);
  }

  createTravel(travel: ITravel): void {
    this.travelRef.doc(travel.name).set({...travel});

  }

  deleteTravel(name: any) {
    this.travelRef.doc(name).delete();
  }

  updateTravel(key: string, value: any) {
    this.travelRef.doc(key).update(value);

  }

  getTravelList()  {
    return this.travelRef;
  }

  getTravel(key: string){
    return this.travelRef.doc(key);
  }
}
