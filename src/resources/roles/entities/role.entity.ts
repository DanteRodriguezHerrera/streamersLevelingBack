import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: "roles",
    timestamps:false
})

export class Role extends Model {
    @Column({
        primaryKey: true,
        type: DataType.STRING({ length: 40 }),
        allowNull: false
    })
    declare role_id: string;

    @Column({
        type: DataType.STRING({ length: 20 }),
        allowNull: false
    })
    declare role_name: string;
}
