import { injectable } from "inversify";
import { Sequelize } from 'sequelize-typescript';
import { ENV_CONFIG } from "../src/env-config";
import { ApiKey } from "../src/models/entities/api-keys";
import { ProspectCustomer } from "../src/models/entities/prospect-customer";
import { Sale } from "../src/models/entities/user";

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
            ProspectCustomer,
            ApiKey,
            Sale
        ]);
    }
}