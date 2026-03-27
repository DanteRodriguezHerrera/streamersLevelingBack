import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'hours',
    timestamps: false
})
export class Hour extends Model {

    @Column({
        type: DataType.STRING({ length: 40 }),
        allowNull: false,
        primaryKey: true
    })
    declare hour_id: string;

    @Column({
        type: DataType.STRING({ length: 5 }),
        allowNull: false
    })
    declare hour_name: string;
    
}
