import { NextFunction, Request, Response, Router } from "express";
import { TokenHelper } from "../common/helpers/token.helper";
import { checkToken } from "../middlewares/check-token";
import { validateInput } from "../middlewares/validate-input";
import { ServicesCollection } from "../providers";
import { ShoppingListService } from "../services/shopping-list.service";
import { shoppingListValidator } from "../validators/shopping-list.validator";

const ShoppingListsController = Router();

const shoppingListService = ServicesCollection.resolve(ShoppingListService);

ShoppingListsController.post('/', [checkToken, validateInput(shoppingListValidator.create)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingList = await shoppingListService.create(req.body, TokenHelper.getUserId(res));
        res.json(shoppingList);
    } catch (error) {
        next(error);
    }
});

ShoppingListsController.put('/', [checkToken, validateInput(shoppingListValidator.update)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingList = await shoppingListService.update(req.body, TokenHelper.getUserId(res));
        res.json(shoppingList);
    } catch (error) {
        next(error);
    }
});

ShoppingListsController.get('/:id', [checkToken, validateInput(shoppingListValidator.getById)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingList = await shoppingListService.getById(Number(req.params.id), TokenHelper.getUserId(res));
        res.json(shoppingList);
    } catch (error) {
        next(error);
    }
});

ShoppingListsController.get('/', [checkToken], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingLists = await shoppingListService.getAll(TokenHelper.getUserId(res));
        res.json(shoppingLists);
    } catch (error) {
        next(error);
    }
});

ShoppingListsController.delete('/:id', [checkToken, validateInput(shoppingListValidator.delete)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        await shoppingListService.delete(Number(req.params.id), TokenHelper.getUserId(res));
        res.json();
    } catch (error) {
        next(error);
    }
});

export { ShoppingListsController };