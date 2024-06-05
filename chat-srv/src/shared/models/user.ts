import {
  Model,
  Column,
  DataType,
  BelongsToMany,
  HasMany,
  BelongsTo,
  Table,
  HasOne,
} from 'sequelize-typescript';
import Message from './message';
import Participant from './participant';

@Table({ schema: process.env.SCHEMA })
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare userId: string;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare participantId: string;

  @BelongsTo(() => Participant, { foreignKey: 'participantId' })
  declare participant: Participant;
}

export default User;
