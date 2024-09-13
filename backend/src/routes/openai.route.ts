import express from "express";
import { generateResultPrompt } from "../controllers/openai.controller";

const router = express.Router();

router.get("/getLoadingMessage", generateResultPrompt);

export default router;
