import { injectable } from "inversify";
import { BarcodeApiProduct } from "../models/external/barcode-product";
import { JSDOM } from 'jsdom';
import { StringHelper } from "../common/helpers/string.helper";
import * as puppeteer from 'puppeteer';

@injectable()
export class BarcodeApiService {

    public async search(barcode: string): Promise<BarcodeApiProduct> {

        let browser: puppeteer.Browser;

        try {
            browser = await puppeteer.launch({
                headless: false,
                defaultViewport: null
            });

            const page = await browser.newPage();

            await page.goto(`https://www.barcodelookup.com/${barcode}`);
            const pageContent = await page.content();

            const { document } = new JSDOM(pageContent).window;

            const productName = StringHelper.normalize(document.querySelector('.product-details > h4')?.textContent);
            const productBrand = StringHelper.normalize(document.querySelector('.product-details > div:nth-child(8) > span')?.textContent);
            const productImage = document.querySelector('#largeProductImage > img')?.src;

            const product: BarcodeApiProduct = {
                title: productName,
                brand: productBrand,
                image: productImage,
                barcode
            };

            console.log(product);

            return product;
        } catch (error) {
            return null;
        } finally {
            browser?.close();
        }
    }

}