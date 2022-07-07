import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../model/userModel";

import { Global } from "./global";




@Injectable()

export class UserServices{

    public url: String;
    public token;
    public gettoken;
    public identity;
    

    constructor( private _http: HttpClient ){

        this.url = Global.url;
    }


    getIdentity(){
        
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity != null){
            this.identity = identity; 
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token = JSON.parse(localStorage.getItem('token'));

        if(token != null){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }

    registro( user: User ): Observable<any>{

        let params = JSON.stringify(user);

        let headers = new HttpHeaders().set('Content-type','application/json');
        return this._http.post(this.url+'registrar',params,{headers:headers});
    }

    loginn( user: User, gettoken = null ): Observable<any>{

     
    // aqui lo que hicimos fue que actualizamos esta parte del codigo haciendo que cuando gettoken sea null, que la propiedad gettoken que ya
    // esta en user se ponga en null asi no da error al logiarnos mas de una vez....
         if( gettoken != null){
            user = Object.assign(user,{gettoken})
         }else{
            gettoken = null
            user = Object.assign(user,{gettoken})
         }


        let params = JSON.stringify(user);

        let headers = new HttpHeaders().set('Content-type','application/json');

        return this._http.post(this.url+'login',params,{headers:headers});
    }


    getAllUsers():Observable<any> {

        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('authorization',this.getToken());

                                   


        return this._http.get(this.url+'getAllUsers', {headers:headers});
    
    }

    getEmail(user):Observable<any>{

        let params = JSON.stringify(user);

        let headers = new HttpHeaders().set('Content-type','application/json');

        return this._http.post(this.url+'getemail',params,{headers:headers} )
    }



    getOneCliente( id ):Observable<any> {

        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('authorization',this.getToken());

        return this._http.get(this.url+'getuser/'+id,{headers: headers });

    }

    updateData(id, body):Observable<any>{

        let param = JSON.stringify(body)
        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('authorization',this.getToken());

       return this._http.put(this.url+'actualizar/'+id,param,{headers: headers})                                
}

updateData02(id, body):Observable<any>{

    let param = JSON.stringify(body)
    let headers = new HttpHeaders().set('Content-type','application/json')
                                   .set('authorization',this.getToken());

   return this._http.put(this.url+'actualizar02/'+id,param,{headers: headers})                                
}

updateData03(id, body):Observable<any>{

    let param = JSON.stringify(body)
    let headers = new HttpHeaders().set('Content-type','application/json')
                                   .set('authorization',this.getToken());

   return this._http.put(this.url+'actualizar03/'+id,param,{headers: headers})                                
}


sevachat(body: any):Observable<any>{

    let param = JSON.stringify(body);
    let headers = new HttpHeaders().set('Content-type','application/json');

    return this._http.post(this.url+'savechat',param,{headers:headers})
}

getChatByEmail(email: any):Observable<any>{

   // let param = JSON.stringify(email);
   let headers = new HttpHeaders().set('Content-type','application/json');

    return this._http.get(this.url+'getChat/'+email,{headers:headers})
}

getBothChatting(email,recpEmail):Observable<any>{
  

    let param = JSON.stringify(recpEmail);

    let headers = new HttpHeaders().set('Content-type','application/json');

    return this._http.post(this.url+'getConv/'+email, param, {headers:headers})
}


calificandoDoct(id,calificacion):Observable<any>{

    let param = JSON.stringify(calificacion)

    let headers = new HttpHeaders().set('Content-type','application/json');

    return this._http.put(this.url+'calificando/'+id, param, {headers: headers});
}

calificar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-type','application/json');

    return this._http.put(this.url+'calificar/'+id, {headers: headers});
}

cambiarcontrasena(id, body):Observable<any>{
    let params = JSON.stringify(body);

    let headers = new HttpHeaders().set('Content-type','application/json')
                                   .set('authorization',this.getToken());

    return this._http.put(this.url+'cambiarContrasena/'+id, params, {headers: headers});

}

savenota(body):Observable<any>{
    let params = JSON.stringify(body);

    let headers = new HttpHeaders().set('Content-type','application/json')
                                   .set('authorization',this.getToken());

    return this._http.post(this.url+'crearnota', params, {headers: headers});

}

getAllNote():Observable<any>{

    let headers = new HttpHeaders().set('Content-type','application/json')
                                   .set('authorization',this.getToken());

    return this._http.get(this.url+'getAllNote',{headers:headers})
}

deleteNote(id):Observable<any>{

    let headers = new HttpHeaders().set('Content-type','application/json');

    return this._http.delete(this.url+'borrarnota/'+id,{headers:headers});
}

updateNoteView(element):Observable<any>{

     
    let params = JSON.stringify(element);

   let headers = new HttpHeaders().set('Content-type','application/json')
                                

    return this._http.put(this.url+'updateNoteView',params,{headers:headers})
}

updateNoteView02(id):Observable<any>{

    let element = {
      notificacionView: true
  }
  let params = JSON.stringify(element);

 let headers = new HttpHeaders().set('Content-type','application/json')
                                .set('authorization',this.getToken());

  return this._http.put(this.url+'updateAllNoteWithId/'+id,params,{headers:headers})
}


getImagenFromCh(email):Observable<any>{
 
   let headers = new HttpHeaders().set('Content-type','application/json');

   return this._http.get(this.url+'getImagenChat/'+email,{headers:headers});

}

subirImagenFromChNew(id):Observable<any>{
 
    let headers = new HttpHeaders().set('Content-type','application/json');
 
    return this._http.get(this.url+'subimagen04/'+id,{headers:headers});
 
 }




}
