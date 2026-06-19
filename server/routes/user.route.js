
import express from "express";

import { login, signup, getProfile, logout, getOtherUsers, updateProfile } from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/get-profile", isAuthenticated, getProfile);
router.post("/get-profile", isAuthenticated, getProfile);
router.post("/logout", logout);
router.get("/other-users", isAuthenticated, getOtherUsers);
router.put("/update-profile", isAuthenticated, updateProfile);


export default router; 