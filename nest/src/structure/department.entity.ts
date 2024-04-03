/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Department extends Model<Department> {
    // name  description managing_id

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.INTEGER,
        unique: false,
        allowNull: true,
    })
    managing_id: number;
     
}

