import { Router } from "express";
import UserRoomController from "./user-rooms.controller";

const userRoomRouter = Router();
userRoomRouter.post("/addUser", UserRoomController.addRoomUser);
userRoomRouter.post("/removeUser", UserRoomController.removeRoomUser);
userRoomRouter.post("/getRoomUsers", UserRoomController.getRoomUsers);
userRoomRouter.post("/getUserRooms", UserRoomController.getUserRooms);
userRoomRouter.post("/bulkRemove", UserRoomController.bulkRemoveRoomUsers);
userRoomRouter.post("/bulkAdd", UserRoomController.bulkAddRoomUsers);

export default userRoomRouter;