import { Column, DataType, Model, Table } from "sequelize-typescript"

@Table({
    tableName: 'users',
    timestamps: false
})
export class User extends Model {

    @Column({
        type: DataType.STRING({ length: 40 }),
        allowNull: false,
        primaryKey: true
    })
    declare user_id: string;

    @Column({
        type: DataType.STRING({ length: 50 }),
        allowNull: false
    })
    declare twitch_id: string;

    @Column({
        type: DataType.STRING({ length: 40 }),
        allowNull: false
    })
    declare role_id: string;

    @Column({
        type: DataType.STRING({ length: 40 }),
        allowNull: true
    })
    declare group_id: string;

    @Column({
        type: DataType.STRING({ length: 40 }),
        allowNull: false
    })
    declare access_token: string;
    
    @Column({
        type: DataType.SMALLINT,
        allowNull: false
    })
    declare expires_in: number;

    @Column({
        type: DataType.STRING({ length: 60 }),
        allowNull: false
    })
    declare refresh_token: string;

    @Column({
        type: DataType.SMALLINT,
        allowNull: false
    })
    declare actual_money: number;

    @Column({
        type: DataType.STRING({ length : 255 }),
        allowNull: false
    })
    declare channel_name: string;
}
