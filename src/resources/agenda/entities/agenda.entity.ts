import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"
import { Day } from "src/resources/days/entities/day.entity";
import { Hour } from "src/resources/hours/entities/hour.entity";
import { User } from "src/resources/users/entities/user.entity";

@Table({
    tableName: 'agenda',
    timestamps: false
})
export class Agenda extends Model {

    @PrimaryKey
    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING({ length: 40 }),
        allowNull: false,
    })
    declare user_id: string;

    @PrimaryKey
    @ForeignKey(() => Day)
    @Column({
        type: DataType.STRING({ length: 40 }),
        allowNull: false
    })
    declare day_id: string;

    @PrimaryKey
    @ForeignKey(() => Hour)
    @Column({
        type: DataType.STRING({ length: 40 }),
        allowNull: false
    })
    declare hour_id: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Day)
    day: Day;

    @BelongsTo(() => Hour)
    hour: Hour;

}
