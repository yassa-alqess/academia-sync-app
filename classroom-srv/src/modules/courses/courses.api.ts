import { Router } from "express";
import { add, get, remove, update } from "./courses.controller";

const courseRouter = Router();

courseRouter.post("/add", add);
courseRouter.post("/getById", get);
courseRouter.post("/updateById", update);
courseRouter.post("/removeById", remove);

export default courseRouter;