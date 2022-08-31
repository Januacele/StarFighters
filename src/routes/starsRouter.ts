import { Router } from "express";
import { battle } from "../controllers/starsController";


const starsRouter = Router();


starsRouter.post("/battle", battle);


export default starsRouter;