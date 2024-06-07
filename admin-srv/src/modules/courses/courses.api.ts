import { Router } from "express";
import CourseController from "./courses.controller";
import upload from "../../config/storage/multer.config";
import CourseService from "./courses.service";

const courseRouter = Router();
const courseController = new CourseController(new CourseService());
courseRouter.post("/addCourse", courseController.addCourse);
courseRouter.post("/bulkAddCourses", upload("courses")!.single("file"), courseController.bulkAddCourses);
courseRouter.post("/getCourse", courseController.getCourse);
courseRouter.post("/updateCourse", courseController.updateCourse);
courseRouter.post("/deleteCourse", courseController.deleteCourse);

export default courseRouter;