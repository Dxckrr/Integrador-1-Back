import { Router } from "express";
import {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    getAppointmentByUser,
    updateAppointmentById,
    deleteAppointmentById,
    getAppointmentsByService,
    getAllAppointments_PRICE,
    getAppointmentByDoc
} from "../../controllers/appointment.controller"
const router: Router = Router();

router
    .post('/create', createAppointment)
    .get('/', getAllAppointments)
    .get('/:id', getAppointmentById)
    .get('/user/:id', getAppointmentByUser) //Doctor or Patient
    .get('/doctor/:id', getAppointmentByDoc)
    .get('/service/:service', getAppointmentsByService )
    .get('/all/price' , getAllAppointments_PRICE) 
    .put('/update/:id', updateAppointmentById)
    .delete('/delete/:id', deleteAppointmentById);

export default router;