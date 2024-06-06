import upload from "@/config/storage/multer.config";
import express from "express";
import AnnouncmentController from "./announcments.controller";
import AnnouncmentService from "./announcments.service";
const announcmentRouter = express.Router();
const announcmentController = new AnnouncmentController(new AnnouncmentService());

announcmentRouter.post("/addAnnouncment", upload("announcments")!.single("file"), announcmentController.addAnnouncment);
announcmentRouter.post("/getAnnouncments", announcmentController.getAnnouncments);
announcmentRouter.post("/updateAnnouncment", upload("announcments")!.single("file"), announcmentController.updateAnnouncment);
announcmentRouter.post("/deleteAnnouncment", announcmentController.deleteAnnouncment);
announcmentRouter.post("/getAnnouncments", announcmentController.getAnnouncments);

export default announcmentRouter;