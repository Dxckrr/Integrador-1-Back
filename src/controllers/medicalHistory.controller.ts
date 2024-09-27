import { getMedicalHistoryByUserId } from "services/core/medicHistory.service";
import { Request, Response } from 'express';

/**
 * Gets the medical history of a user by their ID
 * @param req Request containing the user ID
 * @param res Response containing the medical history of the user or an error message
 * @returns medical history of the user, otherwise an error message
 */
export const getMedicalHistory = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10); 

        const medicalHistory: MedicHistory | null = await getMedicalHistoryByUserId(userId);

        if (!medicalHistory) {
    
            return res.status(404).json({ success: false, message: 'Historia médica no encontrada.' });
        }

       
        return res.status(200).json({ success: true, medicalHistory });
    } catch (error) {
        console.error('Error al obtener la historia médica:', error);
        return res.status(500).json({ success: false, message: 'Error en el servidor.' });
    }
};