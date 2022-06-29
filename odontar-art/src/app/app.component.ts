import { Component, OnInit } from '@angular/core';

import { UserServices } from './services/user.services';

import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, StatusBarStyle, Style } from '@capacitor/status-bar';

import { Platform } from '@ionic/angular';

import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers:[UserServices]
})
export class AppComponent implements OnInit {

  public identity;
  public role;

  constructor( private _userServices: UserServices,private platform: Platform,private androidPermissions: AndroidPermissions ) {
   

 
    
  }
  
  
  ngOnInit(){
    this.identity = this._userServices.getIdentity();
    this.role = this.identity.role;
    this.initializapp()
  }


   initializapp (){

    this.platform.ready().then(()=>{
       SplashScreen.hide()
      //  StatusBar.setBackgroundColor({color:'#7cb9e8'})
      //  StatusBar.setStyle({
      //   style:Style.Light
      
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        (result) =>{

          if(!result.hasPermission){
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
  
          }
          console.log('Has permission?',result.hasPermission)
          
        },(err) => {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
           this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
        });
      
      //  })

    







    })



  }
}
