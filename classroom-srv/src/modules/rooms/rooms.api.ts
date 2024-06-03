import { Router } from "express";
import RoomController from "./rooms.controller";

const roomRouter = Router();

roomRouter.post("/add", RoomController.addRoom);
roomRouter.post("/getById", RoomController.getRoom);
roomRouter.post("/updateById", RoomController.updateRoom);
roomRouter.post("/removeById", RoomController.removeRoom);

export default roomRouter;