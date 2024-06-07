import { Router } from "express";
import courseRouter from "./courses/courses.api";


const restRouter = Router();
restRouter.use("/courses", courseRouter);

export default restRouter;