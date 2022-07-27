import { Component, OnInit } from '@angular/core';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle} from '@fortawesome/free-regular-svg-icons';
import { faLock} from '@fortawesome/free-solid-svg-icons';
import { faUnlock} from '@fortawesome/free-solid-svg-icons';

import { faHourglassHalf} from '@fortawesome/free-solid-svg-icons';
import { faHourglass} from '@fortawesome/free-solid-svg-icons';

import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  
  dateFormControl = new FormControl('');

  dates: string[] = ['11-11-2022', '12-13-2021', '01-01-2020', '01-02-2022', '12-12-2022'];
  surveyTypes:string[]=['Published','Expired','Closed']
  surveyName:string = this.surveyTypes[Math.floor(Math.random() * this.surveyTypes.length)];
  icon = this.surveyName == 'Published' ? faCheckCircle : this.surveyName == 'Expired' ? faHourglass : this.surveyName == 'Closed' ? faUnlock : faUnlock;
  highlight:boolean = false;
  color = this.surveyName == 'Published'? '#69F0AE' : 'grey'

  constructor() { }


  ngOnInit(): void {
   
  }

  highlightIcon(){

    if(!this.highlight)
    {this.icon = this.surveyName == 'Published' ? faCircleCheck : this.surveyName == 'Expired' ? faHourglassHalf : this.surveyName == 'Closed' ? faLock : faLock;
    
     this.highlight = true   }
     
     else{
      this.highlight=false
      this.icon = this.surveyName == 'Published' ? faCheckCircle : this.surveyName =='Expired'? faHourglass : this.surveyName == 'Closed'? faUnlock: faUnlock ;

     }
        
  }

  onBlurMethod(){
    this.highlight=!this.highlight
    this.highlightIcon()
  }











}
