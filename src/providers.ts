import { Container } from 'inversify';
import { Database } from '../database/database-config';
import { AuthService } from './services/auth.service';
import { BarcodeApiService } from './services/barcode-api.service';
import { ProductService } from './services/product.service';
import { ShoppingListProductService } from './services/shopping-list-product.service';
import { ShoppingListService } from './services/shopping-list.service';

const ServicesCollection = new Container();

ServicesCollection.bind(Database).toSelf();
ServicesCollection.bind(ShoppingListService).toSelf();
ServicesCollection.bind(BarcodeApiService).toSelf();
ServicesCollection.bind(ProductService).toSelf();
ServicesCollection.bind(ShoppingListProductService).toSelf();
ServicesCollection.bind(AuthService).toSelf();

export { ServicesCollection };