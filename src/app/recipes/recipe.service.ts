import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChanges = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Ovos rotos',
    //         'Ovos com presunto e queijo',
    //         'https://cdn.vidaativa.pt/uploads/2020/08/receitas-ovos-rotos-850x514.jpg',
    //         [
    //             new Ingredient('ovos', 4),
    //             new Ingredient('bacon', 2),
    //             new Ingredient('queijo', 1)
    //         ]),
    //     new Recipe(
    //         'Francesinha',
    //         'Pão de forma com queijo e carne',
    //         'https://img.cuisineaz.com/660x660/2022/07/18/i184751-francesinha.jpeg',
    //         [
    //             new Ingredient('pão de forma', 2),
    //             new Ingredient('queijo', 2),
    //             new Ingredient('bife de vaca', 1),
    //             new Ingredient('molho francesinha', 1)
    //         ])
    // ];

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanges.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        const recipe = this.recipes[id];

        return recipe;
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanges.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanges.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanges.next(this.recipes.slice());
    }
}