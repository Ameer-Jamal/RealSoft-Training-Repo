import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus="No server has been created!";
  initialServerName='Server Name Here';
  serverName= this.initialServerName;
  hasServerBeenCreated = false;
  constructor() { 

  }

  ngOnInit(): void {
  }


  onCreateServer(){
    this.serverCreationStatus="The server by the name: \" "+this.serverName+" \" has been created";
    this.hasServerBeenCreated=true;
  }
  onResetServerName(){
    this.serverName= '';
    this.allowNewServer=false;
    this.hasServerBeenCreated=false;

  }

  onUpdateServerName(e: any ){
    if(this.serverName ==  this.initialServerName || !this.serverName){
      this.allowNewServer=false;
     }
     else{
      this.allowNewServer=true;
      this.serverName = (<HTMLInputElement>e.target).value
    }
  }
}
