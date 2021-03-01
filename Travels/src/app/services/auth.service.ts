import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<firebase.User | null>;


  constructor(private fireAuth: AngularFireAuth) {
    this.userData = fireAuth.authState;

  }

  login(email: string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  register(email: string, password: string){
    return this.fireAuth.createUserWithEmailAndPassword(email,password);
  }
  signOut(){
    return this.fireAuth.signOut();
  }

  /*changePersistence(persistence: string): void {
    this.fireAuth.setPersistence(persistence);
  }

  getPersistence(): Observable<firebase.auth.Auth.Persistence> {
    return this.dbRef.valueChanges();
  }*/
}
