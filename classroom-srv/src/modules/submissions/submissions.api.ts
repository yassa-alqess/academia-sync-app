import upload from "@/config/storage/multer.config";
import express from "express";
import SubmissionController from "./submissions.controller";
import SubmissionService from "./submissions.service";
const submissionRouter = express.Router();
const submissionController = new SubmissionController(new SubmissionService());


submissionRouter.post("/addSubmission", upload("submissions")!.single("file"), submissionController.addSubmission);
submissionRouter.post("/getSubmission", submissionController.getSubmission);
submissionRouter.post("/updateSubmission", upload("submissions")!.single("file"), submissionController.updateSubmission); //before deadline
submissionRouter.post("/getOnTimeSubmissions", submissionController.getOnTimeSubmissions);
submissionRouter.post("/getLateSubmissions", submissionController.getLateSubmissions);
submissionRouter.post("/deleteSubmission", submissionController.deleteSubmission);
submissionRouter.post("/addGradeToSubmission", submissionController.addGradeToSubmission);

