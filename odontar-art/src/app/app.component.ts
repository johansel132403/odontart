import { Component, OnInit } from '@angular/core';

import { UserServices } from './services/user.services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers:[UserServices]
})
export class AppComponent implements OnInit {

  public identity;
  public role;

  constructor( private _userServices: UserServices ) {
   

 
    
  }
  
  
  ngOnInit(){
    this.identity = this._userServices.getIdentity();
    this.role = this.identity.role;
 
  }
}
