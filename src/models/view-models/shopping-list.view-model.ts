import { DateHelper } from "../../common/helpers/date.helper";
import { ShoppingList } from "../entities/shopping-list";
import { ShoppingListProductViewModel } from "./shopping-list-product.view-model";

export class ShoppingListViewModel {

    public id: number;
    public name: string;
    public shoppingListProducts: ShoppingListProductViewModel[];
    public createdAt: string;

    public static fromEntity(sl: ShoppingList): ShoppingListViewModel {

        if (!sl) return null;

        const shoppingList = new ShoppingListViewModel();
        shoppingList.id = sl.id;
        shoppingList.name = sl.name;
        shoppingList.shoppingListProducts = ShoppingListProductViewModel.fromEntities(sl.shoppingListProducts);
        shoppingList.createdAt = DateHelper.toStringViewModel(sl.createdAt);

        return shoppingList;
    }

    public static fromEntities(shoppingLists: ShoppingList[]): ShoppingListViewModel[] {
        if (!shoppingLists) return null;
        return shoppingLists.map(ShoppingListViewModel.fromEntity);
    }
}