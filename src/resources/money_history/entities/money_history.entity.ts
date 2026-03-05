import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'money_history',
    timestamps: false
})
export class MoneyHistory extends Model {

    @Column({
        type: DataType.STRING({ length: 40 }),
        primaryKey: true,
        allowNull: false,
    })
    declare id_money_history: string;

    @Column({
        type: DataType.SMALLINT(),
        allowNull: false
    })
    declare quantity: number;

    @Column({
        type: DataType.STRING({ length: 255 }),
        allowNull: false
    })
    declare reason: string;

    @Column({
        type: DataType.DATE(),
        allowNull: false
    })
    declare date_money_history: Date;

    @Column({
        type: DataType.STRING({ length: 40 }),
        allowNull: false
    })
    declare user_id: string;
}
