import { Router } from "express";
import { getAllUsersByRole,getUserByRole getAllDoctorsBySpeciality } from "../../controllers/users.controller";
const router: Router = Router();

router
    .get('/:role', getUserByRole)
    .get('/doctors/:idSpeciality', getAllDoctorsBySpeciality)


export default router;