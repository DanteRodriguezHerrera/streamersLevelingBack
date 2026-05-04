import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Group } from "src/resources/groups/entities/group.entity";
import { Role } from "src/resources/roles/entities/role.entity";

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

    @ForeignKey(() => Role)
    @Column({
        type: DataType.STRING({ length: 40 }),
        allowNull: false
    })
    declare role_id: string;

    @ForeignKey(() => Group)
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

    @BelongsTo(() => Group)
    group: Group;

    @BelongsTo(() => Role)
    role: Role
}
