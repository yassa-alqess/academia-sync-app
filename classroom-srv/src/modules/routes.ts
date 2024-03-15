import courseRouter from "./courses/courses.api";
import { Router } from "express";


const restRouter = Router();
restRouter.use("/courses", courseRouter);

export default restRouter;