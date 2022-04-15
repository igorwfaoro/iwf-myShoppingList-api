import { AllowNull, Column, CreatedAt, HasMany, Table, Unique, UpdatedAt } from "sequelize-typescript";
import { Entity } from "../abstraction/entity";
import { ShoppingList } from "./shopping-list";

@Table({
    tableName: 'Users',
    timestamps: true
})
export class User extends Entity {

    public static createDefault(input: {
        name: string;
        email: string;
        password: string;
    }): User {
        return new User(input);
    }

    @AllowNull(false)
    @Column
    public name: string;

    @Unique
    @AllowNull(false)
    @Column
    public email: string;

    @AllowNull(false)
    @Column
    public password: string;

    @HasMany(() => ShoppingList, 'userId')
    public shoppingLists: ShoppingList[];

    @CreatedAt
    @Column
    public createdAt: Date;

    @UpdatedAt
    @Column
    public updatedAt: Date;
}