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
router.route("/logout").get(authMiddleware, signout);
router.post("/verify-email", verifyEmail);
router.get("/auth-check", checkAuth);
export default router;
