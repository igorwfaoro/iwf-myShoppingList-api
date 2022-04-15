import { injectable } from "inversify";
import { NotFoundException } from "../common/exceptions/not-fount.exception";
import { Product } from "../models/entities/product";
import { ShoppingList } from "../models/entities/shopping-list";
import { ShoppingListProduct } from "../models/entities/shopping-list-product";
import { ShoppingListInputModel } from "../models/input-models/shopping-list.input-model";
import { ShoppingListViewModel } from "../models/view-models/shopping-list.view-model";
import { ERROR_MESSAGES } from "../static/error-messages";

@injectable()
export class ShoppingListService {

    public async create(input: ShoppingListInputModel, userId: number): Promise<ShoppingListViewModel> {

        const shoppingList = ShoppingList.createDefault({
            ...input,
            userId
        });

        await shoppingList.save();

        return ShoppingListViewModel.fromEntity(shoppingList);
    }

    public async getAll(userId: number): Promise<ShoppingListViewModel[]> {

        const shoppingLists = await ShoppingList.findAll({
            where: { userId }
        });

        return ShoppingListViewModel.fromEntities(shoppingLists);
    }

    public async getById(id: number, userId: number): Promise<ShoppingListViewModel> {

        const shoppingList = await ShoppingList.findOne({
            where: { id, userId },
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

        return ShoppingListViewModel.fromEntity(shoppingList);
    }

    public async update(input: ShoppingListInputModel, userId: number): Promise<ShoppingListViewModel> {

        const shoppingList = await ShoppingList.findOne({
            where: {
                id: input.id,
                userId
            }
        });

        if (!shoppingList) {
            throw new NotFoundException(ERROR_MESSAGES.SHOPPING_LIST_NOT_FOUND)
        }

        shoppingList.name = input.name;

        await shoppingList.save();

        return ShoppingListViewModel.fromEntity(shoppingList);
    }

    public async delete(id: number, userId: number): Promise<void> {

        const shoppingList = await ShoppingList.findOne({
            where: { id, userId }
        });

        if (!shoppingList) {
            throw new NotFoundException(ERROR_MESSAGES.SHOPPING_LIST_NOT_FOUND)
        }

        await shoppingList.destroy();
    }
}