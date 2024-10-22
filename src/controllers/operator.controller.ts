import { Request, Response } from 'express';
import {
    createOperator as createOperatorService,
    updateOperator as updateOperatorService,
    deleteOperator as deleteOperatorService
} from '../services/core/operators.service';

/**
 * Creates a new operator
 * @param req contains operator data to create
 * @param res
 */
export const createOperator = async (req: Request, res: Response) => {
    try {
        const newOperator = await createOperatorService(req.body);
        return res.status(201).json(newOperator);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

/**
 * Updates operator information
 * @param req contains operator data to update
 * @param res
 */
export const updateOperator = async (req: Request, res: Response) => {
    try {
        const updatedOperator = await updateOperatorService(req.params.CC, req.body);
        if (!updatedOperator) {
            return res.status(404).json({ message: 'Operador no encontrado' });
        }
        return res.status(200).json(updatedOperator);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

/**
 * Deletes an operator
 * @param req contains operator ID to delete
 * @param res
 */
export const deleteOperator = async (req: Request, res: Response) => {
    try {
        const deleted = await deleteOperatorService(req.params.CC);
        if (!deleted) {
            return res.status(404).json({ message: 'Operador no eliminado con éxito' });
        }
        return res.status(200).json({ message: 'Operador eliminado con éxito' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
