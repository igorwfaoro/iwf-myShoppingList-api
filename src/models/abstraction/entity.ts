import { Model, PrimaryKey, AutoIncrement, Column, AllowNull } from "sequelize-typescript";
import { DataTypes } from "sequelize";

export abstract class Entity extends Model{
    
    @Column({
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    })
    public id: number;
}