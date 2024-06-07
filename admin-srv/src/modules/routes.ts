import { Router } from "express";
import courseRouter from "./courses/courses.api";
import userRouter from "./users/users.api";
import userCourseRouter from "./user-courses/user-courses.api";
import lawRouter from "./laws/laws.api";
import lawCourseRouter from "./law-courses/law-courses.api";


const restRouter = Router();
restRouter.use("/courses", courseRouter);
restRouter.use("/users", userRouter);
restRouter.use("/user-courses", userCourseRouter);
restRouter.use("/laws", lawRouter);
restRouter.use("/law-courses", lawCourseRouter);

export default restRouter;