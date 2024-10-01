import { buildPdf } from "../libs/PdfService";
import { Request, Response } from "express";


export const getMedicalRecord = async (req: Request, res: Response) => {
    const prueba = await buildPdf();
    res.status(200).json({ success: true });
};