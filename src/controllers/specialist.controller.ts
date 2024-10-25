import { Request, Response } from 'express';
import {
    createMedic as createMedicService,
    updateMedic as updateMedicService,
    deleteMedic as deleteMedicService
} from '../services/core/specialist.service';

/**
 * Creates a new specialist
 * @param req contains specialist data to create
 * @param res
 */
export const createMedic = async (req: Request, res: Response) => {
    try {
        const newMedic = await createMedicService(req.body);
        return res.status(201).json(newMedic);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

/**
 * Updates specialist information
 * @param req contains specialist data to update
 * @param res
 */
export const updateMedic = async (req: Request, res: Response) => {
    try {
        const updatedMedic = await updateMedicService(req.params.CC, req.body);
        if (!updatedMedic) {
            return res.status(404).json({ message: 'Especialista no encontrado' });
        }
        return res.status(200).json(updatedMedic);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

/**
 * Deletes a specialist
 * @param req contains specialist ID to delete
 * @param res
 */
export const deleteMedic = async (req: Request, res: Response) => {
    try {
        const deleted = await deleteMedicService(req.params.CC);
        if (!deleted) {
            return res.status(404).json({ message: 'Especialista no eliminado con éxito' });
        }
        return res.status(200).json({ message: 'Especialista eliminado con éxito' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
