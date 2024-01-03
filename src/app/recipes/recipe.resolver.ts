import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { inject } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

export const RecipeResolver: ResolveFn<Recipe[]> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const recipes = inject(RecipeService).getRecipes();

        if (recipes.length) {
            return recipes;
        }
        else {
            return inject(DataStorageService).fetchRecipes();
        }
    }