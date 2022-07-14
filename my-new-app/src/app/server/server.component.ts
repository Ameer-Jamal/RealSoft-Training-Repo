import { Component } from '@angular/core'
@Component({
    selector:"app-server",
    templateUrl:"./server.component.html",
    styleUrls: ['./server.component.css']
})


export class serverComponent{
    serverId: number;
    serverStatus="Offline"

    constructor(){
        this.serverId = Math.round(Math.random() * 1000) 
        this.serverStatus = this.serverId>500 ? "Online" : "Offline"
    }

    getColor(){
        return this.serverStatus==="Online" ? "Green" : "Red"
       
    }
}