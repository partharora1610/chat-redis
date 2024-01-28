import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import SocketServer from "./services/socket";

const app = express();
const socketService = new SocketServer();

app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const expressServer = app.listen(5000);

socketService.io.attach(expressServer);
socketService.initListeners();
