import { Router } from "express";
import { getAllUsersByRole, getAllDoctorsBySpeciality } from "../../controllers/users.controller";
const router: Router = Router();

router
    .get('/:role', getAllUsersByRole)
    .get('/doctors/:idSpeciality', getAllDoctorsBySpeciality)


export default router;