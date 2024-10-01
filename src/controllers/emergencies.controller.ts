import { Request, Response } from 'express';
import {
    createEmergency as createEmergencyService,
    getEmergencies as getEmergenciesService,
} from '../services/core/emergencies.service';
/**
 * Creates a new emergency 
 * @param req emergency data needed
 * @param res 
 */
export const createEmergencies = async (req: Request, res: Response) => {
    try {
        const newEmergencie = await createEmergencyService(req.body);
        return res.status(201).json(newEmergencie);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
/**
 * Gets all emergencies
 * @param req 
 * @param res 
 */
export const getEmergencies = async (req: Request, res: Response) => {
    try {
        const emergencies = await getEmergenciesService();
        return res.status(200).json(emergencies);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
