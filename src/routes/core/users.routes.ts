import { Router } from "express";
import { getAllUsersByRole, getAllDoctorsBySpeciality, getUsersById,} from "../../controllers/users.controller";


const router: Router = Router();

router
    .get('/:role', getAllUsersByRole)
    .get('/user/:id', getUsersById)
    .get('/doctors/:idSpeciality', getAllDoctorsBySpeciality)


export default router;