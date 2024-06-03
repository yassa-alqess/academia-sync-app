import { Router } from "express";
import LawController from "./laws.controller";

const lawRouter = Router();

lawRouter.post("/add", LawController.addLaw);
lawRouter.post("/getById", LawController.getLaw);
lawRouter.post("/updateById", LawController.updateLaw);
lawRouter.post("/removeById", LawController.removeLaw);

export default lawRouter;