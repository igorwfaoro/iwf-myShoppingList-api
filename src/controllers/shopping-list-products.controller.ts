import { NextFunction, Request, Response, Router } from "express";
import { TokenHelper } from "../common/helpers/token.helper";
import { checkToken } from "../middlewares/check-token";
import { validateInput } from "../middlewares/validate-input";
import { ServicesCollection } from "../providers";
import { ShoppingListProductService } from "../services/shopping-list-product.service";
import { shoppingListProductValidator } from "../validators/shopping-list-product.validator";

const ShoppingListProductsController = Router({ mergeParams: true });

const shoppingListProductService = ServicesCollection.resolve(ShoppingListProductService);

ShoppingListProductsController.post('/add', [checkToken, validateInput(shoppingListProductValidator.add)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingListProduct = await shoppingListProductService.add(req.body, Number(req.params.shoppingListId), TokenHelper.getUserId(res));
        res.json(shoppingListProduct);
    } catch (error) {
        next(error);
    }
});

ShoppingListProductsController.put('/update', [checkToken, validateInput(shoppingListProductValidator.update)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingListProduct = await shoppingListProductService.update(req.body, TokenHelper.getUserId(res));
        res.json(shoppingListProduct);
    } catch (error) {
        next(error);
    }
});

ShoppingListProductsController.get('/', [checkToken, validateInput(shoppingListProductValidator.getAll)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingListProducts = await shoppingListProductService.getAll(Number(req.params.shoppingListId), TokenHelper.getUserId(res));
        res.json(shoppingListProducts);
    } catch (error) {
        next(error);
    }
});

export { ShoppingListProductsController };