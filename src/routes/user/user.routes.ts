import { Router } from "express";
import { getMedicalRecord } from "../../controllers/user.controller";

const router: Router = Router();

router
    .post('/getMedicalRecord', getMedicalRecord)
    

export default router;