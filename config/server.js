import express from "express";
import bodyParser from "body-parser";
import setRoutes from "./routes"

import cors from "cors"


const server = express();

server.use(bodyParser.json());
server.use(cors());

setRoutes(server);

export default server;
