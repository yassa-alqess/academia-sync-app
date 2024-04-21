import {
  Table,
  Model,
  Column,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import Feedback from './feedback';

@Table({ schema: process.env.SCHEMA })
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare userId: string;

  @HasMany(() => Feedback)
  declare feedbacks: Feedback[];
}

export default User;
