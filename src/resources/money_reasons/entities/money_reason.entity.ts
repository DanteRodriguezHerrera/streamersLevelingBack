import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'money_reason',
    timestamps: false
})
export class MoneyReason extends Model {

    @Column({
        primaryKey: true,
        type: DataType.STRING({ length: 40 }),
        allowNull: false
    })
    declare money_reason_id: string;

    @Column({
        type: DataType.SMALLINT,
        allowNull: false,
    })
    declare quantity: number;

    @Column({
        type: DataType.SMALLINT,
        allowNull: false
    })
    declare reason: number;

    @Column({
        type: DataType.STRING({ length: 255 }),
        allowNull: false
    })
    declare description: string;
}
