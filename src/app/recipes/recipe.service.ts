import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe('Ovos rotos', 'Ovos com presunto e queijo', 'https://cdn.vidaativa.pt/uploads/2020/08/receitas-ovos-rotos-850x514.jpg'),
        new Recipe('Francesinha', 'Pão de forma com queijo e carne', 'https://img.cuisineaz.com/660x660/2022/07/18/i184751-francesinha.jpeg')
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}