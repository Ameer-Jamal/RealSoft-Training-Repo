import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus="No server has been created!";
  initialServerName='';
  placeHolder="Please enter a server name"
  serverName= this.initialServerName;
  hasServerBeenCreated = false;
  arrOfServers = ['server1'];
  hideToggle=false;


  constructor() { 

  }

  ngOnInit(): void {

  }

  onHideServers(){
    if(this.hideToggle == false)
    this.hideToggle=true;
    else this.hideToggle=false;
}
  onCreateServer(){
    this.arrOfServers.push(this.serverName)
    this.serverCreationStatus="The server by the name: \" "+this.serverName+" \" has been created";
    this.hasServerBeenCreated=true;
  }
  onResetServerName(){
    this.serverName= '';
    this.allowNewServer=false;
    this.hasServerBeenCreated=false;

  }

  onUpdateServerName(e: any ){                        // or is empty
    if(this.serverName ==  this.initialServerName || !this.serverName){
      this.allowNewServer=false;
     }
     else{
      this.allowNewServer=true;
      this.serverName = (<HTMLInputElement>e.target).value
    }
  }


}
