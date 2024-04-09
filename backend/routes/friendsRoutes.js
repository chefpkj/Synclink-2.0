import express from "express";
import jwtControls from "../middleware/jwtControls.js";
import friendsController from "../controllers/friendsController.js";
import { searchFriendsApiValidations,addFriendsApiValidations } from "../middleware/friendsValidations.js";
const router=express.Router();


router
   .route("/friends")
   .get([jwtControls.authorizeToken],friendsController.getAllFriends)
   .post([jwtControls.authorizeToken,addFriendsApiValidations],friendsController.addFriend)
   

router
   .route("/friends/:id")
   .delete([jwtControls.authorizeToken],friendsController.deleteFriend)
      

router.route("/serachID")
   .get([jwtControls.authorizeToken,searchFriendsApiValidations],friendsController.searchFriend)



export default router;   