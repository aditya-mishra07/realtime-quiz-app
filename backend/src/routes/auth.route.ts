import express from "express";
import {
  checkAuth,
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
router.post("/auth-check", checkAuth);
export default router;
