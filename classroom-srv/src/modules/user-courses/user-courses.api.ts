import { Router } from "express";
import UserCourseController from "./user-courses.controller";

const userCourseRouter = Router();
userCourseRouter.post("/addUser", UserCourseController.addCourseUser);
userCourseRouter.post("/removeUser", UserCourseController.removeCourseUser);
userCourseRouter.post("/getCourseUsers", UserCourseController.getCourseUsers);
userCourseRouter.post("/getUserCourses", UserCourseController.getUserCourses);
userCourseRouter.post("/bulkRemove", UserCourseController.bulkRemoveCourseUsers);
userCourseRouter.post("/bulkAdd", UserCourseController.bulkAddCourseUsers);

export default userCourseRouter;