import { Table, Model, Column, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';

//many to many
import User from './user';

@Table({
  tableName: 'preferences',
  modelName: 'Preference',
})
class Preference extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(50),
  })
  declare preference_id: string;

  @Column({
    type: DataType.STRING(200),
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare value: string;

  @Column({
    type: DataType.STRING(100),
  })
  declare preference_type: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(50),
  })
  declare user_id: string;

  @BelongsTo(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare user: User;
}

export default Preference;
