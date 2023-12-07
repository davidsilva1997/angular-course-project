import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Ovos rotos',
            'Ovos com presunto e queijo',
            'https://cdn.vidaativa.pt/uploads/2020/08/receitas-ovos-rotos-850x514.jpg',
            [
                new Ingredient('ovos', 4),
                new Ingredient('bacon', 2),
                new Ingredient('queijo', 1)
            ]),
        new Recipe(
            'Francesinha',
            'Pão de forma com queijo e carne',
            'https://img.cuisineaz.com/660x660/2022/07/18/i184751-francesinha.jpeg',
            [
                new Ingredient('pão de forma', 2),
                new Ingredient('queijo', 2),
                new Ingredient('bife de vaca', 1),
                new Ingredient('molho francesinha', 1)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}