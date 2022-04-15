import { inject, injectable } from "inversify";
import { NotFoundException } from "../common/exceptions/not-fount.exception";
import { Product } from "../models/entities/product";
import { ProductViewModel } from "../models/view-models/product.view-model";
import { ERROR_MESSAGES } from "../static/error-messages";
import { BarcodeApiService } from "./barcode-api.service";

@injectable()
export class ProductService {

    constructor(
        @inject(BarcodeApiService) private _barcodeProductSearcherService: BarcodeApiService
    ) { }

    public async getByBarcode(barcode: string): Promise<ProductViewModel> {

        const product = await Product.findOne({
            where: { barcode }
        });

        if (!product) {
            const productFromApi = await this._barcodeProductSearcherService.search(barcode);

            if (!productFromApi)
                throw new NotFoundException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);

            const product = Product.createDefault({
                ...productFromApi,
                barcode
            });

            await product.save();

            return ProductViewModel.fromEntity(product);
        }

        return ProductViewModel.fromEntity(product);
    }

}