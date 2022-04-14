import { AllowNull, BelongsTo, Column, CreatedAt, HasMany, Table, UpdatedAt } from "sequelize-typescript";
import { Entity } from "../abstraction/entity";
import { ShoppingListProduct } from "./shopping-list-product";
import { User } from "./user";

@Table({
    tableName: 'ShoppingLists',
    timestamps: true
})
export class ShoppingList extends Entity {

    public static createDefault(input: {
        userId: number;
        name: string;
    }): ShoppingList {
        return new ShoppingList(input);
    }

    @AllowNull(false)
    @Column
    public userId: number;
    @BelongsTo(() => User, 'userId')
    public user: User;

    @AllowNull(false)
    @Column
    public name: string;

    @HasMany(() => ShoppingListProduct, 'shoppingListId')
    public shoppingListProducts: ShoppingListProduct[];

    @CreatedAt
    @Column
    public createdAt: Date;

    @UpdatedAt
    @Column
    public updatedAt: Date;
}