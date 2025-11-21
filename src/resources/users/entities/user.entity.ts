import { Model, Table } from "sequelize-typescript"

@Table({
    tableName: 'Users',
    timestamps: false
})
export class User extends Model {

}
