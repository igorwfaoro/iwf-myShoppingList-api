import { DateHelper } from "../../common/helpers/date.helper";
import { ShoppingListProduct } from "../entities/shopping-list-product";
import { ProductViewModel } from "./product.view-model";

export class ShoppingListProductViewModel {

    public id: number;
    public product: ProductViewModel;
    public quantity: number;
    public createdAt: string;

    public static fromEntity(slp: ShoppingListProduct): ShoppingListProductViewModel {

        if (!slp) return null;

        const shoppingListProduct = new ShoppingListProductViewModel();
        shoppingListProduct.id = slp.id;
        shoppingListProduct.product = ProductViewModel.fromEntity(slp.product);
        shoppingListProduct.quantity = slp.quantity;
        shoppingListProduct.createdAt = DateHelper.toStringViewModel(slp.createdAt);

        return shoppingListProduct;
    }

    public static fromEntities(shoppingListProducts: ShoppingListProduct[]): ShoppingListProductViewModel[] {
        if (!shoppingListProducts) return null;
        return shoppingListProducts.map(ShoppingListProductViewModel.fromEntity);
    }
}