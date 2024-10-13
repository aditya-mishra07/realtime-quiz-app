import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import { UserManager } from "./managers/UserManager";

const app = express();
const httpServer = app.listen(8000);

const wss = new WebSocketServer({ server: httpServer });

const userManager = new UserManager();

wss.on("connection", function connection(ws: WebSocket) {
  userManager.addUser(ws);
});
