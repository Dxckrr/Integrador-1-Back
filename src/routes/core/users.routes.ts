import { Router } from "express";
import { getAllUsersByRole, getAllDoctorsBySpeciality, getUsersById, getAllPacients, getHistoryClinic, getCVUser, getOrder, getCVEmployee, getPayStub, getBill } from "../../controllers/users.controller";
const router: Router = Router();

router
    .get('/:role', getAllUsersByRole)
    .get('/user/:id', getUsersById)
    .get('/doctors/:idSpeciality', getAllDoctorsBySpeciality)
    .get('/', getAllPacients)
    .get('/getHistoryClinic/:cc/:idCita', getHistoryClinic)
    .get('/getCVUser/:cc', getCVUser)
    .get('/getCVEmployee/:cc', getCVEmployee)
    .get('/getOrder/:id', getOrder)
    .get('/getPayStub/:id', getPayStub)
    .get('/getBill/:id', getBill)

export default router;