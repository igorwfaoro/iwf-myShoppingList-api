import { NextFunction, Request, Response, Router } from "express";
import { checkToken } from "../middlewares/check-token";
import { validateInput } from "../middlewares/validate-input";
import { ServicesCollection } from "../providers";
import { ProductService } from "../services/product.service";
import { productValidator } from "../validators/product.validator";

const ProductsController = Router();

const productService = ServicesCollection.resolve(ProductService);

ProductsController.get('/barcode/:barcode', [checkToken, validateInput(productValidator.getByBarcode)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productService.getByBarcode(req.params.barcode);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

export { ProductsController };