import { Request, Response } from "express";
import { getAppointmentsByDate } from "../services/hours.service";
/**
 * Authenticates a user by checking their email and password, and then logs them in.
 * 
 * @param req email && password
 * @param res
 * @returns if success , users data otherwise throws an error
 */
export const getHoursAvailable = async (req: Request, res: Response) => {
    try {
        const date = req.params.date;

        if (!date) {
            return res.status(404).json({ success: false, message: 'La fecha no es valida o  no existe.' });
        }

        const hours: string[] | null = await getAppointmentsByDate(date);

        if (!hours) {
            return res.status(404).json({ success: false, message: 'La contraseña no es correcta.' });
        }
        return res.status(200).json(hours)
    } catch (error) {
        console.error("Error during login: ", error);
        return res.status(404).json({ success: false, message: 'Error interno del servidor.' });
    }
};