import { Router } from "express";
import {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    getAppointmentByUser,
    updateAppointmentById,
    deleteAppointmentById
} from "../../controllers/appointment.controller"
const router: Router = Router();

router
    .post('/create', createAppointment)
    .get('/', getAllAppointments)
    .get('/:id', getAppointmentById)
    .get('/user/:id', getAppointmentByUser) //Doctor or Patient
    .put('/update/:id', updateAppointmentById)
    .delete('/delete/:id', deleteAppointmentById);

export default router;