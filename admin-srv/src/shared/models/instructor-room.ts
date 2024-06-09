import { Column, Table, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import Room from './room';
import Instructor from './instructor';

@Table({ schema: process.env.SCHEMA })
class InstructorRoom extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare userRoomId: string;

    @ForeignKey(() => Room)
    @Column({
        type: DataType.UUID,
    })
    declare roomId: string;

    @BelongsTo(() => Room, 'roomId')
    declare room: Room;

    @ForeignKey(() => Instructor)
    @Column({
        type: DataType.UUID,

    })
    declare instructorId: string;

    @BelongsTo(() => Instructor, 'instructorId')
    declare instructor: Instructor;

}

export default InstructorRoom;
