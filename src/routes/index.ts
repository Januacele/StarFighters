import { Router } from "express";
import starsRouter from "./starsRouter";

const router = Router();
router.use(starsRouter);

export default router;