import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'groups',
    timestamps: false,
})
export class Group extends Model {
    @Column({
        primaryKey: true,
        type: DataType.STRING({length: 255}),
        allowNull: false
    })
    declare group_id: string;

    @Column({
        type: DataType.STRING({length: 255}),
        allowNull: false
    })
    declare group_name: string
}
