import { Router } from "express";
import RoomController from "./rooms.controller";
import RoomService from "./rooms.service";

const roomRouter = Router();
const roomController = new RoomController(new RoomService());
roomRouter.post("/addRoomToCourse", roomController.addRoom);
roomRouter.post("/getRoomDetails", roomController.getRoom);
roomRouter.post("/updateRoom", roomController.updateRoom);
roomRouter.post("/deleteRoom", roomController.deleteRoom);

export default roomRouter;