import { Request, Response } from 'express';
import {
    createAppointment as createAppointmentService,
    getAllAppointments as getAllAppointmentsService,
    getAppointmentById as getAppointmentByIdService,
    getAppointmentByUser as getAppointmentByUserService,
    updateAppointmentById as updateAppointmentByIdService,
    deleteAppointmentById as deleteAppointmentByIdService,
    getAppointmentsByService as getAppointmentsByService_Service
} from '../services/core/appointment.service';
import { getUserNameById } from 'services/core/user.service';

/**
 * Creates a new appointment
 * @param req appointment data needed
 * @param res 
 */
export const createAppointment = async (req: Request, res: Response) => {
    try {
        const newAppointment = await createAppointmentService(req.body);
        return res.status(201).json(newAppointment);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
/**
 * Gets all appointment
 * @param req 
 * @param res 
 */
export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await getAllAppointmentsService();
        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
/**
 * Gets an a appointment by its id
 * @param req 
 * @param res 
 * @returns 
 */
export const getAppointmentById = async (req: Request, res: Response) => {
    try {
        const appointment = await getAppointmentByIdService(parseInt(req.params.id));
        if (!appointment) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        return res.status(200).json(appointment);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
/**
 * Gets an appointment by its user prop
 * @param req 
 * @param res 
 */
export const getAppointmentByUser = async (req: Request, res: Response) => {
    try {
        const appointments = await getAppointmentByUserService(parseInt(req.params.id));
        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
/**
 * Update an appoinment by its id
 * @param req 
 * @param res 
 * @returns 
 */
export const updateAppointmentById = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const updatedAppointment = await updateAppointmentByIdService(parseInt(req.params.id), req.body);
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        return res.status(200).json(updatedAppointment);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
export const deleteAppointmentById = async (req: Request, res: Response) => {
    try {
        const deleteAppointment = await deleteAppointmentByIdService(parseInt(req.params.id));
        if (!deleteAppointment) {
            return res.status(404).json({ message: 'Cita no eliminada con exito' });
        }
        return res.status(200).json({ message: 'Appointment successfully deleted' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
export const getAppointmentsByService = async (req: Request, res: Response) => {
    try {
        const appointments = await getAppointmentsByService_Service(parseInt(req.params.service));
        if (!appointments) {
            return res.status(404).json({ message: 'Cita no eliminada con exito' });
        }
        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
