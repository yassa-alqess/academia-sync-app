import { Router } from "express";
import UserController from "./users.controller";
import upload from "../../config/storage/multer.config";
import UserService from "./users.service";

const userRouter = Router();
const userController = new UserController(new UserService());
userRouter.post("/addUser", userController.addUser); //specify role
userRouter.post("/updateUser", userController.updateUser);
userRouter.post("/deleteUser", userController.deleteUser);
userRouter.post("/bulkAddStudents", upload("users")!.single("file"), userController.bulkAddStudents);
userRouter.post("/bulkAddAssistants", upload("users")!.single("file"), userController.bulkAddAssistants);
userRouter.post("/bulkAddDoctors", upload("users")!.single("file"), userController.bulkAddDoctors);

export default userRouter;