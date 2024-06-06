import { Router } from "express";
import UserRoomController from "./user-rooms.controller";
import UserRoomService from "./user-rooms.service";

const userRoomRouter = Router();
const userRoomController = new UserRoomController(new UserRoomService());

userRoomRouter.post("/addUser", userRoomController.addRoomUser);
userRoomRouter.post("/removeUser", userRoomController.removeRoomUser);
userRoomRouter.post("/getRoomUsers", userRoomController.getRoomUsers);
userRoomRouter.post("/getUserRooms", userRoomController.getUserRooms);
userRoomRouter.post("/bulkRemove", userRoomController.bulkRemoveRoomUsers);
userRoomRouter.post("/bulkAdd", userRoomController.bulkAddRoomUsers);

export default userRoomRouter;