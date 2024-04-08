import express from "express";
import jwtControls from "../middleware/jwtControls.js";
import sharedNotesController from "../controllers/sharedNotesController.js";
import { addNewSharedNotesApiValidations, deleteSharedNotesApiValidations } from "../middleware/sharedNotesValidations.js";
const router=express.Router();

router
   .route("/sharedNotes")
   .get(jwtControls.authorizeToken,sharedNotesController.getAllSharedNotes)
   .post([jwtControls.authorizeTokenAndPutEveryDetailInReqBody,addNewSharedNotesApiValidations],sharedNotesController.addShareNotes)
   .delete([jwtControls.authorizeToken,deleteSharedNotesApiValidations],sharedNotesController.deleteShareNotes);

router
   .route("/sharedNotes/:id")
   .get(jwtControls.authorizeToken,sharedNotesController.getSpecificSharedNotes)
export default router;   