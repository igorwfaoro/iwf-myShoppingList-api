import { injectable } from "inversify";
import { Sequelize } from 'sequelize-typescript';
import { ENV_CONFIG } from "../src/env-config";
import { Product } from "../src/models/entities/product";
import { ShoppingList } from "../src/models/entities/shopping-list";
import { ShoppingListProduct } from "../src/models/entities/shopping-list-product";
import { User } from "../src/models/entities/user";

@injectable()
export class Database {
    public readonly sequelize: Sequelize

    constructor() {

        this.sequelize = new Sequelize({
            host: ENV_CONFIG.DATABASE_HOST,
            username: ENV_CONFIG.DATABASE_USER,
            password: ENV_CONFIG.DATABASE_PASSWORD,
            database: ENV_CONFIG.DATABASE_SCHEMA,
            dialect: "mysql",
            dialectOptions: {
                decimalNumbers: true,
                useUTC: true
            },
            timezone: "+00:00",
        });

        this.sequelize.addModels([
            Product,
            ShoppingList,
            ShoppingListProduct,
            User
        ]);
    }
}