import { registerSatisfactionData , getAllData } from "../controllers/satisfaction.controller";
import { Router } from "express";
const router: Router = Router();

router
    .post('/submit', registerSatisfactionData)
    .get('/', getAllData)


export default router;