// import getHtml from 'html-get';
// import browserless from 'browserless';

// getHtml('https://www.barcodelookup.com/7896331705713', {
//     getBrowserless: browserless,
//     prerender
// }).then(result => {
//     console.log(result)
// });

import createBrowserless from 'browserless';
import { JSDOM } from 'jsdom';

const normalizeString = (value) => {
    // remove wraps and trim but keep spaces
    return value?.replace(/^\s*\(.*\)\s*/, '').trim();
}

const run = async () => {
    const browserlessFactory = createBrowserless();
    const browserless = await browserlessFactory.createContext();

    console.log('getting html...');
    const result = await browserless.html('https://www.barcodelookup.com/7891000325131');
    console.log('got html');

    await browserless.destroyContext();
    await browserlessFactory.close();

    const { document } = new JSDOM(result).window;

    const productName = normalizeString(document.querySelector('.product-details > h4')?.textContent);
    const productBrand = normalizeString(document.querySelector('.product-details > div:nth-child(7) > span')?.textContent);
    const productImage = document.querySelector('#largeProductImage > img')?.src;

    const product = {
        name: productName,
        brand: productBrand,
        image: productImage
    };

    console.log(product);
}

run();