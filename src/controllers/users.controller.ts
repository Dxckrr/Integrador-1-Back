import { Request, Response } from 'express';
import {
    getAllUsersByRole as getAllUsersByRoleService,
    getAllDoctorsBySpeciality as getAllDoctorsBySpecialityService,
    getUserById,

} from '../services/core/user.service';
import { User } from 'interfaces/User';

/**
 * Gets all users by their role
 * @param req user_role
 * @param res 
 * @returns users by id otherwise throw an error
 */
export const getAllUsersByRole = async (req: Request, res: Response) => {
    console.log(req.params.role)
    //cambios realizados para que traiga todos los usuario y no solo el primero
    const users: User[] | null = await getAllUsersByRoleService(parseInt(req.params.role));
    if (!users || users.length === 0) {
        console.log(users);
        return res.status(404).json({ success: false, message: 'Usuarios no encontrados.' });
    }
    res.status(200).json({ success: true, users });
};

export const getUsersById = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await getUserById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
      }
  
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      res.status(500).json({ success: false, message: 'Error en el servidor.' });
    }
  };
/**
 * Gets all medics by their specialization
 * @param req role
 * @param res 
 * @returns medics by id otherwise throw an error
 */
export const getAllDoctorsBySpeciality = async (req: Request, res: Response) => {
    console.log(req.params.idSpeciality)
    const user: User[] | null = await getAllDoctorsBySpecialityService(parseInt(req.params.idSpeciality));
    if (!user) {
        console.log(user)
        return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
    }
    res.status(200).json({ success: true, user });
};

