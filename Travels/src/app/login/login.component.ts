import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;

  current: string ='';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    if(this.current === 'None'){
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
      .then(() =>  {this.auth.login(this.email, this.password).then(()=>this.router.navigate(['/travels']));})
    }
    else if(this.current === 'Session'){
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() =>  {this.auth.login(this.email, this.password).then(()=>this.router.navigate(['/travels']));})
    }
    else{
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() =>  {this.auth.login(this.email, this.password).then(()=>this.router.navigate(['/travels']));})
    }


  }
  register(): void{
    this.auth.register(this.email, this.password);
  }

  setNone(): void {
    this.current = 'None';
  }

  setSession(): void {
    this.current = 'Session';
  }

  setLocal(): void {
    this.current = 'Local';
  }


}
