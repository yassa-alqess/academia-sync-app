import { Router } from "express";
import LawCourseController from "./law-courses.controller";
import LawCourseService from "./law-courses.service";

const lawCourseRouter = Router();
const lawCourseController = new LawCourseController(new LawCourseService());
lawCourseRouter.post("/addCourse", lawCourseController.addLawCourse);
lawCourseRouter.post("/deleteCourse", lawCourseController.deleteLawCourse);
lawCourseRouter.post("/getLawCourses", lawCourseController.getLawCourses);
lawCourseRouter.post("/bulkDeleteLawCourses", lawCourseController.bulkDeleteLawCourses);
lawCourseRouter.post("/bulkAddLawCourses", lawCourseController.bulkAddLawCourses);

export default lawCourseRouter;