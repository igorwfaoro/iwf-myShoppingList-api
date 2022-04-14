import { DateHelper } from "../../common/helpers/date.helper";
import { ShoppingList } from "../entities/shopping-list";

export class ShoppingListViewModel {

    public id: number;
    public name: string;
    public createdAt: string;

    public static fromEntity(sl: ShoppingList): ShoppingListViewModel {

        if (!sl) return null;

        const shoppingList = new ShoppingListViewModel();
        shoppingList.id = sl.id;
        shoppingList.name = sl.name;
        shoppingList.createdAt = DateHelper.toStringViewModel(sl.createdAt);

        return shoppingList;
    }

    public static fromEntities(shoppingLists: ShoppingList[]): ShoppingListViewModel[] {
        if (!shoppingLists) return null;
        return shoppingLists.map(ShoppingListViewModel.fromEntity);
    }
}