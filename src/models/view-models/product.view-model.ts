import { DateHelper } from "../../common/helpers/date.helper";
import { Product } from "../entities/product";

export class ProductViewModel {

    public id: number;
    public title: string;
    public brand: string;
    public image: string;
    public barcode: string;
    public createdAt: string;

    public static fromEntity(p: Product): ProductViewModel {

        if (!p) return null;

        const product = new ProductViewModel();
        product.id = p.id;
        product.title = p.title;
        product.brand = p.brand;
        product.image = p.image;
        product.barcode = p.barcode;
        product.createdAt = DateHelper.toStringViewModel(p.createdAt);

        return product;
    }
}