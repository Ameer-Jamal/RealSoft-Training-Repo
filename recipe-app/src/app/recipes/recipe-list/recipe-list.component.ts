import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
recipes:Recipe[] =[
  new Recipe("Grilled Cheese","1-put cheese in bread 2-grill until cheese melts","https://assets.bonappetit.com/photos/57acf62a53e63daf11a4dbee/5:7/w_1244,h_1742,c_limit/best-ever-grilled-cheese.jpg"),
  new Recipe("Chicken Parm","1-Make Chicken 2-Parmify","https://assets.bonappetit.com/photos/5ea8f0df16738800085ad5d2/1:1/w_2560%2Cc_limit/Chicken-Parmesean-Recipe-Lede.jpg"),

]
  
constructor() { }

  ngOnInit(): void {
  }

}
