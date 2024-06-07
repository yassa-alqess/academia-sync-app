import upload from "../../config/storage/multer.config";
import express from "express";
import AssignmentController from "./assignments.controller";
import AssignmentService from "./assignments.service";
const assignmentRouter = express.Router();
const assignmentController = new AssignmentController(new AssignmentService());

assignmentRouter.post("/addAssignment", upload("assignments")!.single("file"), assignmentController.addAssignment);
assignmentRouter.post("/getAssignments", assignmentController.getAssignments);
assignmentRouter.post("/getAssignment", assignmentController.getAssignment);
assignmentRouter.post("/getFinishedAssignments", assignmentController.getFinishedAssignments);
assignmentRouter.post("/getUnfinishedAssignments", assignmentController.getUnfinishedAssignments);
assignmentRouter.post("/updateAssignment", upload("assignments")!.single("file"), assignmentController.updateAssignment);
assignmentRouter.post("/deleteAssignment", assignmentController.deleteAssignment);

export default assignmentRouter;