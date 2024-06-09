import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import User from "./user";
import Announcment from "./announcment";
import Assignment from "./assignment";
import Course from "./course";
import InstructorCourse from "./instructor-course";

@Table({ schema: 'public' })
class Instructor extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare instructorId: string;

    @Column({
        type: DataType.STRING(200),
    })
    declare displayName: string;

    @Column({
        type: DataType.INTEGER,
    })
    declare role: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
    })
    declare userId: string;

    @BelongsTo(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    declare user: User;

    @HasMany(() => Announcment)
    declare announcments: Announcment[];

    @HasMany(() => Assignment)
    declare assignments: Assignment[];

    @BelongsToMany(() => Course, () => InstructorCourse)
    declare courses: Course[];
}

export default Instructor;