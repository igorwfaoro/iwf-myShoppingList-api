import { Container } from 'inversify';
import { Database } from '../database/database-config';
import { BarcodeProductSearcherService } from './services/barcode-product-searcher.service';
import { ShoppingListService } from './services/shopping-list.service';

const ServicesCollection = new Container();

ServicesCollection.bind(Database).toSelf();
ServicesCollection.bind(ShoppingListService).toSelf();
ServicesCollection.bind(BarcodeProductSearcherService).toSelf();

export { ServicesCollection };