import { AllowNull, BelongsTo, Column, CreatedAt, Table, UpdatedAt } from "sequelize-typescript";
import { Entity } from "../abstraction/entity";
import { Product } from "./product";
import { ShoppingList } from "./shopping-list";

@Table({
    tableName: 'ShoppingListProducts',
    timestamps: true
})
export class ShoppingListProduct extends Entity {

    public static createDefault(input: {
        shoppingListId: number;
        productId: number;
        image: string;
    }): ShoppingListProduct {
        return new ShoppingListProduct(input);
    }

    @AllowNull(false)
    @Column
    public shoppingListId: number;
    @BelongsTo(() => ShoppingList, 'shoppingListId')
    public shoppingList: ShoppingList;

    @AllowNull(false)
    @Column
    public productId: number;
    @BelongsTo(() => Product, 'productId')
    public product: Product;

    @AllowNull(false)
    @Column
    public quantity: number;

    @CreatedAt
    @Column
    public createdAt: Date;

    @UpdatedAt
    @Column
    public updatedAt: Date;
}