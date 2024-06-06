
import { Router } from "express";
import announcmentRouter from "./announcments/announcments.api";
import assignmentRouter from "./assignments/assignments.api";
import submissionRouter from "./submissions/submissions.api";
import roomRouter from "./rooms/rooms.api";
import userRoomRouter from "./user-rooms/user-rooms.api";


const restRouter = Router();
restRouter.use("/announcments", announcmentRouter);
restRouter.use("/assignments", assignmentRouter);
restRouter.use("/submissions", submissionRouter);
restRouter.use("/rooms", roomRouter);
restRouter.use("/user-rooms", userRoomRouter);
export default restRouter;