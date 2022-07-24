import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public dataFields:Object = {text:"name",value:"ID"}

  public users:Object[] = [
{ID:1,name:"AmeerJamal"},
{ID:2,name:"Jhon Doe"},
{ID:3,name:"Heba Basim"},
{ID:4,name:"Jane Smith"},
] 
 constructor() { }
  
  ngOnInit(): void {
  }

}
