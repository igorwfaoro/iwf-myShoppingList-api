import { injectable } from "inversify";
import { NotFoundException } from "../common/exceptions/not-fount.exception";
import { Product } from "../models/entities/product";
import { ShoppingList } from "../models/entities/shopping-list";
import { ShoppingListProduct } from "../models/entities/shopping-list-product";
import { ShoppingListProductCreateInputModel } from "../models/input-models/shopping-list-product-create.input-model";
import { ShoppingListProductUpdateInputModel } from "../models/input-models/shopping-list-product-update.input-model";
import { ShoppingListProductViewModel } from "../models/view-models/shopping-list-product.view-model";
import { ERROR_MESSAGES } from "../static/error-messages";

@injectable()
export class ShoppingListProductService {

    public async add(input: ShoppingListProductCreateInputModel, shoppingListId: number, userId: number): Promise<ShoppingListProductViewModel> {

        const shoppingList = await ShoppingList.findOne({
            where: {
                id: shoppingListId,
                userId
            }
        });

        if (!shoppingList)
            throw new NotFoundException(ERROR_MESSAGES.SHOPPING_LIST_NOT_FOUND);

        const shoppingListProduct = ShoppingListProduct.createDefault({
            ...input,
            shoppingListId
        });

        await shoppingListProduct.save();

        return ShoppingListProductViewModel.fromEntity(shoppingListProduct);
    }

    public async remove(shoppingListProductId: number, userId: number): Promise<void> {

        const shoppingListProduct = await ShoppingListProduct.findOne({
            where: {
                id: shoppingListProductId,
                '$shoppingList.userId$': userId
            },
            include: [
                {
                    model: ShoppingList,
                    as: 'shoppingList'
                }
            ]
        });

        if (!shoppingListProduct)
            throw new NotFoundException(ERROR_MESSAGES.SHOPPING_LIST_PRODUCT_NOT_FOUND);

        await shoppingListProduct.destroy();
    }

    public async update(input: ShoppingListProductUpdateInputModel, userId: number): Promise<ShoppingListProductViewModel> {
            
            const shoppingListProduct = await ShoppingListProduct.findOne({
                where: {
                    id: input.shoppingListProductId,
                    '$shoppingList.userId$': userId
                },
                include: [
                    {
                        model: ShoppingList,
                        as: 'shoppingList'
                    }
                ]
            });
    
            if (!shoppingListProduct)
                throw new NotFoundException(ERROR_MESSAGES.SHOPPING_LIST_PRODUCT_NOT_FOUND);
    
            shoppingListProduct.quantity = input.quantity;
    
            await shoppingListProduct.save();
    
            return ShoppingListProductViewModel.fromEntity(shoppingListProduct);
    }

    public async getAll(shoppingListId: number, userId: number): Promise<ShoppingListProductViewModel[]> {

        const shoppingList = await ShoppingList.findOne({
            where: { id: shoppingListId, userId },
            include: [
                {
                    model: ShoppingListProduct,
                    as: 'shoppingListProducts',
                    include: [
                        {
                            model: Product,
                            as: 'product'
                        }
                    ]
                }
            ]
        });

        if (!shoppingList)
            throw new NotFoundException(ERROR_MESSAGES.SHOPPING_LIST_NOT_FOUND);

        return ShoppingListProductViewModel.fromEntities(shoppingList.shoppingListProducts);
    }

}