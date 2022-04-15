import { AllowNull, Column, CreatedAt, Table, Unique, UpdatedAt } from "sequelize-typescript";
import { Entity } from "../abstraction/entity";

@Table({
    tableName: 'Products',
    timestamps: true
})
export class Product extends Entity {

    public static createDefault(input: {
        title: string;
        brand: string;
        image?: string;
        barcode: string;
    }): Product {
        return new Product(input);
    }

    @AllowNull(false)
    @Column
    public title: string;

    @AllowNull(false)
    @Column
    public brand: string;

    @Column
    public image?: string;

    @Unique
    @AllowNull(false)
    @Column
    public barcode: string;

    @CreatedAt
    @Column
    public createdAt: Date;

    @UpdatedAt
    @Column
    public updatedAt: Date;
}