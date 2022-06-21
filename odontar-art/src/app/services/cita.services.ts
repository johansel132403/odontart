import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { User} from "../model/userModel";
import { Cita } from "../model/citaModel";

import { UserServices } from "./user.services";

import { Global } from "./global";




@Injectable()

export class CitaServices{

    public url;
    public token;
    public identity;

    

    constructor(private _userServices: UserServices, private _http: HttpClient){


      this.url = Global.url;
      this.token = this._userServices.getToken();
        
    }


    grearCita(id, body):Observable<any>{
 
        let params = JSON.stringify(body);

        let headers = new HttpHeaders().set('Content-type','application/json')
                                       .set('authorization',this.token);

        return this._http.post(this.url+'crearcita/'+id,params,{headers:headers})                               


    }

    getCitasDeUnId(id):Observable<any>{

      let headers = new HttpHeaders().set('Content-type','application/json')
                                    //  .set('authorization',this.token);

      return this._http.get(this.url+'getusercitas/'+id ,{ headers: headers })
    }

    getOneCita(id):Observable<any>{

      let headers = new HttpHeaders().set('Content-type','application/json')
                                     .set('authorization',this.token)

      return this._http.get(this.url+'getonecita/'+id,{ headers: headers })
    }

    getCitaUser():Observable<any>{

      let headers = new HttpHeaders().set('Content-type','application/json')
                                     .set('authorization',this.token)

       return this._http.get( this.url+'getusercitas/',{ headers: headers } );

    }

    getCitaWithUser():Observable<any>{

      let headers = new HttpHeaders().set('Content-type','application/json')
                                     .set('authorization',this.token)

                                     
      return this._http.get( this.url+'getcitaswithuser/',{ headers: headers});
    }


    editCitas(id,body):Observable<any>{

      let params = JSON.stringify(body);

      let headers = new HttpHeaders().set('Content-type','application/json')
                                     .set('authorization',this.token);

       return this._http.put(this.url+'actualizarcita/'+id, params , {headers: headers});                               

    }

    getAllcitas():Observable<any>{


      let headers = new HttpHeaders().set('Content-type','application/json')
                                     .set('authorization',this.token);

        return this._http.get(this.url+'getallcita',{ headers: headers })                              
    }

    getCitaOneUser(id):Observable<any>{

      let headers = new HttpHeaders().set('Content-type','application/json')

      return this._http.get(this.url+'getcitaoneuser/'+id, { headers: headers })


    }

    getMyAllAppointment(id):Observable<any>{
      let headers = new HttpHeaders().set('Content-type','application/json');
    

return this._http.delete(this.url+'getusercitas/'+id, { headers: headers });   
    }
                                

    DeleteCitas(id):Observable<any>{

      let headers = new HttpHeaders().set('Content-type','application/json')
                                     .set('authorization',this.token);

       return this._http.delete(this.url+'deletecita/'+id, { headers: headers });                               

    }
}