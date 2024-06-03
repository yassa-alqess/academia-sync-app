import { Router } from "express";
import CourseController from "./courses.controller";

const courseRouter = Router();

courseRouter.post("/add", CourseController.addCourse);
courseRouter.post("/getById", CourseController.getCourse);
courseRouter.post("/updateById", CourseController.updateCourse);
courseRouter.post("/removeById", CourseController.removeCourse);

export default courseRouter;