import { Request, Response } from 'express';
import { createOrdenMedica, getOrdenMedicaById, getAllOrdenesMedicas } from '../services/core/order.service';


/**
 * Controller to create a new medical order
 * @param req 
 * @param res 
 */
export async function createOrdenMedicaController(req: Request, res: Response) {
    try {
        const ordenMedicaData = req.body;
        const result = await createOrdenMedica(ordenMedicaData);
        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating medical order.', error });
    }
}

/**
 * Controller to get a medical order by ID
 * @param req 
 * @param res 
 */
export async function getOrdenMedicaByIdController(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id, 10);
        const ordenMedica = await getOrdenMedicaById(id);
        if (ordenMedica) {
            res.status(200).json(ordenMedica);
        } else {
            res.status(404).json({ message: 'Medical order not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving medical order.', error });
    }
}

/**
 * Controller to get all medical orders
 * @param req 
 * @param res 
 */
export async function getAllOrdenesMedicasController(req: Request, res: Response) {
    try {
        const ordenesMedicas = await getAllOrdenesMedicas();
        if (ordenesMedicas) {
            res.status(200).json(ordenesMedicas);
        } else {
            res.status(404).json({ message: 'No medical orders found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving medical orders.', error });
    }
}
