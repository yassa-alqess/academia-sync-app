import { Router } from "express";
import UserCourseController from "./user-courses.controller";
import UserCourseService from "./user-courses.service";

const userCourseRouter = Router();
const userCourseController = new UserCourseController(new UserCourseService());
userCourseRouter.post("/addUser", userCourseController.addCourseUser);
userCourseRouter.post("/deleteUser", userCourseController.deleteCourseUser);
userCourseRouter.post("/getCourseUsers", userCourseController.getCourseUsers);
userCourseRouter.post("/getUserCourses", userCourseController.getUserCourses);
userCourseRouter.post("/bulkDeleteCourseUsers", userCourseController.bulkDeleteCourseUsers);
userCourseRouter.post("/bulkAddCourseUsers", userCourseController.bulkAddCourseUsers);
// userCourseRouter.post("/bulkAddCourseUsersBySheet", userCourseController.bulkAddCourseUsersBySheet);
// userCourseRouter.post("/bulkAddUserCoursesBySheet", userCourseController.bulkAddUserCoursesBySheet);

export default userCourseRouter;