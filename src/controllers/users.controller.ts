import { Request, Response } from 'express';
import {
    getAllUsersByRole as getAllUsersByRoleService,
    getAllDoctorsBySpeciality as getAllDoctorsBySpecialityService

} from '../services/user.service';
import { User } from 'interfaces/User';
/**
 * Gets all users by their role
 * @param req user_role
 * @param res 
 * @returns users by id otherwise throw an error
 */
export const getAllUsersByRole = async (req: Request, res: Response) => {
    console.log(req.params.role)
    const user: User  | null = await getAllUsersByRoleService(parseInt(req.params.role));
    if (!user) {
        console.log(user)
        return res.status(404).json({ success: false, message: 'Usuarios no encontrados.' });
    }
    res.status(200).json({ success: true, user });
};
/**
 * Gets all medics by their specialization
 * @param req role
 * @param res 
 * @returns medics by id otherwise throw an error
 */
export const getAllDoctorsBySpeciality = async (req: Request, res: Response) => {
    console.log(req.params.role)
    const user: User | null = await getAllDoctorsBySpecialityService(parseInt(req.params.idSpeciality));
    if (!user) {
        console.log(user)
        return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
    }
    res.status(200).json({ success: true, user });
};