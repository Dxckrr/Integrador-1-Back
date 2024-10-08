import { Router } from "express";
import { getAllUsersByRole, getAllDoctorsBySpeciality, getUsersById, getAllPacients, getHistoryClinic, getCV, getOrder } from "../../controllers/users.controller";
const router: Router = Router();

router
    .get('/:role', getAllUsersByRole)
    .get('/user/:id', getUsersById)
    .get('/doctors/:idSpeciality', getAllDoctorsBySpeciality)
    .get('/', getAllPacients)
    .get('/getHistoryClinic/:cc/:idCita', getHistoryClinic)
    .get('/getCV/:cc/:idRol', getCV)
    .get('/getOrder/:id', getOrder)

export default router;