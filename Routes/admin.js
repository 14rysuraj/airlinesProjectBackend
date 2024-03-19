import express from "express";
import { adminLogout, adminProfile, adminRegister, adminlogin, allCreatedTicket, count } from "../controllers/admin.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/login").post(adminlogin);
router.get('/count', count);
router.post('/register', adminRegister);
router.get('/logout', adminLogout);
router.get('/profile', isAdminAuthenticated, adminProfile);
router.get('/allbookedticket',isAdminAuthenticated, allCreatedTicket);



export default router;

