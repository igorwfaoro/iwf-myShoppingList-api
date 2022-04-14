import { injectable } from "inversify";
import { BarcodeProduct } from "../models/external/barcode-product";
import createBrowserless from 'browserless';
import { JSDOM } from 'jsdom';
import { StringHelper } from "../common/helpers/string.helper";

@injectable()
export class BarcodeProductSearcherService {

    public async search(barcode: string): Promise<BarcodeProduct> {

        try {
            const browserlessFactory = createBrowserless();
            const browserless = await browserlessFactory.createContext();

            const result = await browserless.html(`https://www.barcodelookup.com/${barcode}`);

            await browserless.destroyContext();
            await browserlessFactory.close();

            const { document } = new JSDOM(result).window;

            const productName = StringHelper.normalize(document.querySelector('.product-details > h4')?.textContent);
            const productBrand = StringHelper.normalize(document.querySelector('.product-details > div:nth-child(7) > span')?.textContent);
            const productImage = document.querySelector('#largeProductImage > img')?.src;

            const product: BarcodeProduct = {
                name: productName,
                brand: productBrand,
                image: productImage,
                barcode
            };

            return product;

        } catch {
            return null;
        }
    }

}