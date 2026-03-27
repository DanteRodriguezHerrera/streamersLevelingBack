import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'days',
    timestamps: false
})
export class Day extends Model {

    @Column({
        type: DataType.STRING({ length: 40 }),
        primaryKey: true,
        allowNull: false
    })
    declare day_id: string;

    @Column({
        type: DataType.STRING({ length: 9 }),
        allowNull: false
    })
    declare day_name: string;
}
