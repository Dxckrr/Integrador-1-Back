import { Request, Response } from 'express';
import {
    getNumberOfSpecialites,
    getMoreAskedSpecialty,
    getNumberOfUsers,
    getNumberOfPatients,
    getNumberOfServices,
    getMoreAskedServicee,
    getNumberOfEmergencies,
    getNumberOfAppointmentsDone,
    getLastAppointmentDone,
    getNumberOfAppointments_OnWait,
    getLastAppointment_OnWait,
    getTotalIncome,
} from '../services/stadistics.service'; 
/**
 * Gets all data from satisfaction surveys 
 * @param req
 * @param res 
 */
export const getAllStadistics = async (req: Request, res: Response) => {
    try {
        const [
            numberOfSpecialties,
            moreAskedSpecialty,
            numberOfUsers,
            numberOfPatients,
            numberOfServices,
            moreAskedService,
            numberOfEmergencies,
            numberOfAppointmentsDone,
            lastAppointmentDone,
            numberOfAppointmentsOnWait,
            lastAppointmentOnWait,
            totalIncome
        ] = await Promise.all([
            getNumberOfSpecialites(),
            getMoreAskedSpecialty(),
            getNumberOfUsers(),
            getNumberOfPatients(),
            getNumberOfServices(),
            getMoreAskedServicee(),
            getNumberOfEmergencies(),
            getNumberOfAppointmentsDone(),
            getLastAppointmentDone(),
            getNumberOfAppointments_OnWait(),
            getLastAppointment_OnWait(),
            getTotalIncome()
        ]);

        const result = {
            numberOfSpecialties,
            moreAskedSpecialty,
            numberOfUsers,
            numberOfPatients,
            numberOfServices,
            moreAskedService,
            numberOfEmergencies,
            numberOfAppointmentsDone,
            lastAppointmentDone,
            numberOfAppointmentsOnWait,
            lastAppointmentOnWait,
            totalIncome
        };

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching statistics:", error);
        return res.status(500).json({ message: error || "Internal Server Error" });
    }
};
