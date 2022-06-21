import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import  io from 'socket.io-client';
import { Global } from "./services/global";

@Injectable({
    providedIn:'root'
})

export class webSocketService{
    
    socket: any;
    readonly url: string = 'http://localhost:3800';

    constructor(){

        this.socket = io(this.url)
    }


    // listen(eventName:string){
    //     return new Observable((subscriber) => {
            
    //         this.socket.on(eventName, (data)=> {
    //             subscriber.next(data)
    //             console.log('pm',data)
    //         })
    //     });

    // }


    // emit(eventName:string, data: any){
    //     this.socket.emit(eventName,data)
    //     //console.log(data)

    // }

    // on(eventName:string){
    //     return new Observable((subscriber) => {

    //         this.socket.on(eventName, (data) => {
    //              subscriber.next(data)
    //         })
    //     })
    // }

}