import { getAllStadistics , getAppointmentsEstadistics } from "../controllers/stadistics.controller";
import { Router } from "express";
const router: Router = Router();

router
    .get('/', getAllStadistics)
    .get('/appointmentsStadistics', getAppointmentsEstadistics)


export default router;