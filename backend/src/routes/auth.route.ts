import express from "express";
import {
  refreshAccessToken,
  signin,
  signout,
  signup,
  verifyEmail,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);
router.post("/refresh-token", refreshAccessToken);
router.route("/logout").post(authMiddleware, signout);
router.post("/verify-email", verifyEmail);
export default router;
