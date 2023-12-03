import { Component, OnInit,Input} from '@angular/core';
import { Router } from '@angular/router';
import { RecipeInterface } from 'src/app/models/recipe';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  router: any
  constructor(router: Router) {
    this.router = router;
  }

  @Input()
  recipe!: RecipeInterface;
  ngOnInit(): void {

  }

  to_recipe(recipe_id:string){
    var data = {
      recipe: recipe_id
    }
       

    // this.router.navigate(['/view-recipe/'+recipe_id]);
    this.router.navigate(['view-recipe/' + JSON.stringify(data)]);
  }
}
