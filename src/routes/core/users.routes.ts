import { Router } from "express";
import { getAllUsersByRole, getAllDoctorsBySpeciality, getAllPacients } from "../../controllers/users.controller";
const router: Router = Router();

router
    .get('/:role', getAllUsersByRole)
    .get('/doctors/:idSpeciality', getAllDoctorsBySpeciality)
    .get('/', getAllPacients)
    


export default router;