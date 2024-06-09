import { Router } from "express";
import UserCourseController from "./user-courses.controller";
import UserCourseService from "./user-courses.service";
import upload from "../../config/storage/multer.config";


const userCourseRouter = Router();
const userCourseController = new UserCourseController(new UserCourseService());
userCourseRouter.post("/addUser", userCourseController.addCourseUser);
userCourseRouter.post("/deleteUser", userCourseController.deleteCourseUser);
userCourseRouter.post("/getCourseUsers", userCourseController.getCourseUsers);
userCourseRouter.post("/getUserCourses", userCourseController.getUserCourses);
userCourseRouter.post("/bulkDeleteCourseStudents", userCourseController.bulkDeleteCourseStudents);
userCourseRouter.post("/bulkAddCourseStudents", userCourseController.bulkAddCourseStudents);
userCourseRouter.post("/bulkAddCourseStudentsBySheet", upload("courseUsers")!.single("file"), userCourseController.bulkAddCourseStudentsBySheet);
// userCourseRouter.post("/bulkAddUserCoursesBySheet", userCourseController.bulkAddUserCoursesBySheet);

export default userCourseRouter;