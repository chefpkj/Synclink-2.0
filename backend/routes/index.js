import {Router} from "express";
import authRoutes from "./authRoutes.js";
import notesRoutes from "./notesRoutes.js";
import friendsRoutes from './friendsRoutes.js'
import adminRoutes from "./admin/adminRoutes.js";
import sharedRoutes from "./sharedNotesRoutes.js";

const router = Router();




router.use(authRoutes);
router.use(notesRoutes);
router.use(friendsRoutes);
router.use(sharedRoutes);
router.use("/admin",adminRoutes)


export default router;