import { Router } from "express";
import LawCourseController from "./law-courses.controller";

const lawCourseRouter = Router();
lawCourseRouter.post("/addCourse", LawCourseController.addLawCourse);
lawCourseRouter.post("/removeCourse", LawCourseController.removeLawCourse);
lawCourseRouter.post("/getLawCourses", LawCourseController.getLawCourses);
lawCourseRouter.post("/bulkRemove", LawCourseController.bulkRemoveLawCourses);
lawCourseRouter.post("/bulkAdd", LawCourseController.bulkAddLawCourses);

export default lawCourseRouter;