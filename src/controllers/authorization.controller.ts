import { Request, Response } from 'express';
import {
    getAuthorizationById as getAuthorizationByIdService,
    updateAuthorization as updateEmergencyService
} from '../services/core/medicalAuthorization.service';
/**
 * Gets a an authorization by its id 
 * @param req id needed
 * @param res 
 */
export const getAuthorizationById = async (req: Request, res: Response) => {
    try {
        const authorization = await getAuthorizationByIdService(parseInt(req.params.id));
        return res.status(201).json(authorization);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
/**
 * Approves a authorization 
 * @param req id  needed
 * @param res 
 */
export const updateAuthorization = async (req: Request, res: Response) => {
    try {
        const authorization = await updateEmergencyService(parseInt(req.params.id));
        return res.status(201).json(authorization);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
