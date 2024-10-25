import { Request, Response } from 'express';
import {
    updatePatient as updatePatientService,
    changePatientStatus as changePatientStatusService
} from '../services/core/patient.service';

/**
 * Updates patient information
 * @param req contains patient data to update
 * @param res
 */
export const updatePatient = async (req: Request, res: Response) => {
    try {
        const updatedPatient = await updatePatientService(req.params.CC, req.body);
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        return res.status(200).json(updatedPatient);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

/**
 * Changes patient's status
 * @param req contains patient's status data
 * @param res
 */
export const changePatientStatus = async (req: Request, res: Response) => {
    try {
        const updatedPatient = await changePatientStatusService(req.params.CC, req.body.status);
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        return res.status(200).json(updatedPatient);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
