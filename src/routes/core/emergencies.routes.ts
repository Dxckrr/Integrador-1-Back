import { Router } from "express";
import { createEmergencies, getEmergencies } from "../../controllers/emergencies.controller"
const router: Router = Router();

router
    .post('/create', createEmergencies)
    .get('/', getEmergencies)
export default router;