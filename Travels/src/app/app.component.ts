import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'zad7';

  loggedIN: boolean = false;
  constructor(private auth: AuthService){

  }
  ngOnInit(): void {
    this.auth.userData.subscribe((User)=>{
    if(User === null){
      this.loggedIN = false;
    }
    else{
      this.loggedIN =true;
    }
  });
  }

  logOut(){
    this.auth.signOut();
  }

}
