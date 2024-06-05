import upload from "@/config/storage/multer.config";
import express from "express";
import AssignmentController from "./assignments.controller";
import AssignmentService from "./assignments.service";
const assignmentRouter = express.Router();
const assignmentController = new AssignmentController(new AssignmentService());

assignmentRouter.post("/addAssignment", upload("assignments")!.single("file"), assignmentController.addAssignment);
assignmentRouter.post("/getAssignments", assignmentController.getAssignments); // if it's after deadline frontend should show that it's late to submit but still open
assignmentRouter.post("/getAssignments", assignmentController.getAssignments);
assignmentRouter.post("/updateAssignment", upload("assignment")!.single("file"), assignmentController.updateAssignment);
assignmentRouter.post("/deleteAssignment", assignmentController.deleteAssignment);