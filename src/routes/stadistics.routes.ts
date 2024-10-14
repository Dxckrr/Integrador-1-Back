import { getAllStadistics } from "../controllers/stadistics.controller";
import { Router } from "express";
const router: Router = Router();

router
    .get('/', getAllStadistics)


export default router;