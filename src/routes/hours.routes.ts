import { Router } from "express";
import { getHoursAvailable } from "../controllers/hours.controller";
const router: Router = Router();

router
    .get('/available/:date', getHoursAvailable)

export default router;