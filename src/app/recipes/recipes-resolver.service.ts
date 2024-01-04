import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "./recipe.model";
import { inject } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

export const recipesResolver: ResolveFn<Recipe[]> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] => {
    return inject(DataStorageService).fetchRecipes();
}