import { Router } from "express";
import { VERSION } from "../version";
import { ProductsController } from "./controllers/products.controller";
import { ShoppingListProductsController } from "./controllers/shopping-list-products.controller";
import { ShoppingListsController } from "./controllers/shopping-lists.controller";
import { CONSTANTS } from "./static/constants";

const routes = Router();

routes.get(`/`, (req, res) => res.json({
    name: CONSTANTS.API_NAME,
    version: VERSION
}));

routes.use(`/${CONSTANTS.API_V1}/products`, ProductsController);
routes.use(`/${CONSTANTS.API_V1}/shoppingLists`, ShoppingListsController);
routes.use(`/${CONSTANTS.API_V1}/shoppingLists/:shoppingListId/products`, ShoppingListProductsController);

export { routes };