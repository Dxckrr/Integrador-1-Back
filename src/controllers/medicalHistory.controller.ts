import { Request, Response } from 'express';
import { createHistoriaMedica, getMedicalHistoryById } from '../services/core/medicHistory.service';

/**
 * Controlador para crear una nueva historia médica
 * @param req 
 * @param res 
 */
export async function createHistoriaMedicaController(req: Request, res: Response) {
    try {
        const historiaMedicaData = req.body;
        const result = await createHistoriaMedica(historiaMedicaData);

        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(500).json(result);
        }

    } catch (error) {
        res.status(500).json({ message: 'Error creando la historia médica.', error });
    }
}

export const getMedicalHistory = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10); 

        if (isNaN(userId)) {
            return res.status(400).json({ success: false, message: 'ID de usuario inválido.' });
        }

        const medicalHistory = await getMedicalHistoryById(userId); // Ensure this function is implemented correctly

        if (!medicalHistory) {
            return res.status(404).json({ success: false, message: 'Historia médica no encontrada.' });
        }

        return res.status(200).json({ success: true, medicalHistory });
    } catch (error) {
        console.error('Error al obtener la historia médica:', error);
        return res.status(500).json({ success: false, message: 'Error en el servidor.' });
    }
};


