import  { Injectable } from '@angular/core';






import { SMS } from '@awesome-cordova-plugins/sms/ngx';     


@Injectable()



export class Services{

    constructor(private sms: SMS){}
    
    //Enviar mensaje
    SendSms( mess: any ){

        console.log('mensaje enviado',mess)
        let option = {
          replaceLineBreaks:false,
          android: {
            intent: 'INTENT'
          }
        };
    
       this.sms.send('8093199970', mess ,option,).then(() => {
    
         console.log('Working !!');
    
       }).catch((error)=>{
          console.log(JSON.stringify(error));
       });
        
       //this.sms.send()
       
       
      }
}