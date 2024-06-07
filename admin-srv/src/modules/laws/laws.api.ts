import { Router } from "express";
import LawController from "./laws.controller";
import LawService from "./laws.service";

const lawRouter = Router();
const lawController = new LawController(new LawService());
lawRouter.post("/addLaw", lawController.addLaw);
lawRouter.post("/getLaw", lawController.getLaw);
lawRouter.post("/updateLaw", lawController.updateLaw);
lawRouter.post("/deleteLaw", lawController.deleteLaw);

export default lawRouter;