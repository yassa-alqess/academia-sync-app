import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import User from "./user";
import AssignmentSubmission from "./assignment-submission";
import Room from "./room";
import UserRoom from "./user-room";

@Table({ schema: 'public' })
class Student extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare studentId: string;

    @Column({
        type: DataType.STRING(200),
    })
    declare displayName: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
    })
    declare userId: string;

    @BelongsTo(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    declare user: User;

    @HasMany(() => AssignmentSubmission)
    declare assignmentSubmissions: AssignmentSubmission[];

    @BelongsToMany(() => Room, () => UserRoom)
    declare rooms: Room[];
}

export default Student;