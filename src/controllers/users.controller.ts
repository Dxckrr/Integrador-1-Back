import { Request, Response } from 'express';
import {
    getAllUsersByRole as getAllUsersByRoleService,
    getAllDoctorsBySpeciality as getAllDoctorsBySpecialityService,
    getAllPacients as getAllPacientsService,
    getHistoryClinicInfo,
    getOrderInfo,
    getCVInfo,
    getPayStubInfo,
} from '../services/core/user.service';
import { User } from 'interfaces/User';
import { buildCVPdf, buildHistoryClinicPdf, buildOrderdf, buildPayStubpdf } from '../libs/PdfService';
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
 * Gets all pacients users
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllPacients = async (req: Request, res: Response) => {
    console.log(req.params.role)
    const user: User  | null = await getAllPacientsService();
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
    console.log(req.params.idSpeciality)
    const user: User[] | null = await getAllDoctorsBySpecialityService(parseInt(req.params.idSpeciality));
    if (!user) {
        console.log(user)
        return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
    }
    res.status(200).json({ success: true, user });
};
/**
 * Gets the history clinic PDF
 * @param req 
 * @param res 
 */
export const getHistoryClinic = async (req: Request, res: Response) => {
    try {
        const { cc, idCita } = req.params;
        if (!cc || !idCita) {
            return res.status(400).send("Documento o ID no proporcionados");
        }

        const infoHistoryClinic: any | null = await getHistoryClinicInfo(cc, parseInt(idCita));

        const pdf = await buildHistoryClinicPdf(infoHistoryClinic);
        
        res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=filename.pdf"
        });

        res.end(pdf);
    } catch (error) {
        console.error("Error al generar o enviar el PDF:", error);
        res.status(500).send("Error al generar o enviar el PDF");
    }
}
/**
 * Gets the cv PDF for any user
 * @param req 
 * @param res 
 * @returns 
 */
export const getCV = async (req: Request, res: Response) => {
    try {
        const { cc, idRol } = req.params;
        if (!cc || !idRol) {
            return res.status(400).send("Documento o ID no proporcionados");
        }
        
        const infoCV: any | null = await getCVInfo(cc);

        const pdf = await buildCVPdf(infoCV);
        
        res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=filename.pdf"
        });

        res.end(pdf);
    } catch (error) {
        console.error("Error al generar o enviar el PDF:", error);
        res.status(500).send("Error al generar o enviar el PDF");
    }
}
/**
 * Gets the medic order PDF
 * @param req 
 * @param res 
 * @returns 
 */
export const getOrder = async (req: Request, res: Response) => {
    try {
        const id  = req.params.id;
        if (!id) {
            return res.status(400).send("ID no proporcionados");
        }
        
        const infoOrder: any | null = await getOrderInfo(parseInt(id));
        
        const pdf = await buildOrderdf(infoOrder);
        
        res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=filename.pdf"
        });

        res.end(pdf);
    } catch (error) {
        console.error("Error al generar o enviar el PDF:", error);
        res.status(500).send("Error al generar o enviar el PDF");
    }
}
/**
 * Gets the payStub PDF
 * @param req 
 * @param res 
 * @returns 
 */
export const getPayStub = async (req: Request, res: Response) => {
    try {
        const id  = req.params.id;
        if (!id) {
            return res.status(400).send("ID no proporcionados");
        }
        
        const infoPay: any | null = await getPayStubInfo(parseInt(id));
        
        const pdf = await buildPayStubpdf(infoPay);
        
        res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=filename.pdf"
        });

        res.end(pdf);
    } catch (error) {
        console.error("Error al generar o enviar el PDF:", error);
        res.status(500).send("Error al generar o enviar el PDF");
    }
}