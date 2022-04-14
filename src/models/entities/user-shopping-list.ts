import { AllowNull, BelongsTo, Column, Table } from "sequelize-typescript";
import { Entity } from "../abstraction/entity";
import { ShoppingList } from "./shopping-list";
import { User } from "./user";

@Table({
    tableName: 'UsersShoppingLists',
    timestamps: false
})
export class UserShoppingList extends Entity {

    public static createDefault(input: {
        userId: number;
        shoppingListId: number;
    }): UserShoppingList {
        return new UserShoppingList(input);
    }

    @AllowNull(false)
    @Column
    public userId: number;
    @BelongsTo(() => User, 'userId')
    public user: User;

    @AllowNull(false)
    @Column
    public shoppingListId: number;
    @BelongsTo(() => ShoppingList, 'shoppingListId')
    public shoppingList: ShoppingList;
}