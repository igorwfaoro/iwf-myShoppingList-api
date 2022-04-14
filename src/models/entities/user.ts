import { AllowNull, Column, CreatedAt, Table, Unique, UpdatedAt } from "sequelize-typescript";
import { Entity } from "../abstraction/entity";

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

    @CreatedAt
    @Column
    public createdAt: Date;

    @UpdatedAt
    @Column
    public updatedAt: Date;

    // @AllowNull(false)
    // @Column({ field: 'prospect_customer_id' })
    // public prospectCustomerId: number;
    // @BelongsTo(() => ProspectCustomer, 'prospectCustomerId')
    // public prospectCustomer: ProspectCustomer;
}