import express from "express";
import { signin, signout, signup } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);
router.route("/logout").post(authMiddleware, signout);

export default router;
