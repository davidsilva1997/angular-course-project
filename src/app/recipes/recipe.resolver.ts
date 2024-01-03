import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { inject } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

export const RecipeResolver: ResolveFn<Recipe[]> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(DataStorageService).fetchRecipes();
    }