import { inject, injectable } from "inversify";
import { NotFoundException } from "../common/exceptions/not-fount.exception";
import { ShoppingList } from "../models/entities/shopping-list";
import { ShoppingListProduct } from "../models/entities/shopping-list-product";
import { ShoppingListProductInputModel } from "../models/input-models/shopping-list-product";
import { ShoppingListInputModel } from "../models/input-models/shopping-list.input-model";
import { ShoppingListProductViewModel } from "../models/view-models/shopping-list-product.view-model";
import { ShoppingListViewModel } from "../models/view-models/shopping-list.view-model";
import { ERROR_MESSAGES } from "../static/error-messages";
import { BarcodeProductSearcherService } from "./barcode-product-searcher.service";

@injectable()
export class ShoppingListService {

    constructor(
        @inject(BarcodeProductSearcherService) private _barcodeProductSearcherService: BarcodeProductSearcherService
    ) { }

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
            where: { id, userId }
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

    public async addProduct(input: ShoppingListProductInputModel, userId: number): Promise<ShoppingListProductViewModel> {
        return null;
        // const shoppingList = await ShoppingList.findOne({
        //     where: {
        //         id: input.shoppingListId,
        //         userId
        //     }
        // });

        // if (!shoppingList) {

        //     this._barcodeProductSearcherService.search(input.barcode);

        //     throw new NotFoundException(ERROR_MESSAGES.SHOPPING_LIST_NOT_FOUND)
        // }

        // const shoppingListProduct = await ShoppingListProduct.createDefault({

        // });

        // await shoppingListProduct.save();

        // return ShoppingListProductViewModel.fromEntity(shoppingListProduct);
    }

}